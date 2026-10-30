# CCSを参考にした分割後ラベル補正

## WSLへ配置

起動中のAPIを`Ctrl+C`で停止し、次をWSLで実行してください。
`segmentation.py`など、従来の分割機能は配置済みであることを前提とします。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/ccs_postprocessing.py" ip_object_name/
cp "$bundle/ip_object_name/workflow_api.py" ip_object_name/

export IP_OBJECT_NAME_MODEL=gemini-3.8-flash
export IP_PART_PLANNER_MODEL=gemini-3.8-flash
export BLENDER_BIN=/usr/bin/blender
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
```

追加ライブラリは不要です。既存のNumPy、SciPy、Trimeshを使います。
Windows側のStreamlitも再起動し、ブラウザを再読み込みしてください。

## 操作

1. 従来どおりパーツ構成を作り、「分割を実行」を押す。
2. 「CCS補正を実行」を押す。保存済みの分割NPZからCPU処理し、GPU推論・Gemini・Blenderは呼び直しません。
3. 「表示結果」で「補正前」「CCS補正後」を切り替える。
4. 「表示パーツ」で個々のパーツを比較する。
5. 「補正診断」で面数・連結成分数の前後、スキップ理由を確認する。
6. 選択中の結果のGLB・NPZ・JSONをダウンロードする。

最大反復数は初期値5、範囲1〜30です。「CCS補正設定」で変更できます。
繰り返し実行しても、UIは常に元の分割結果から補正します。前回のCCS結果へ累積適用しません。
結果取得に失敗した場合は「CCS結果の取得を再開」で不足ファイルだけ取得します。
元モデル・要求文・パーツ構成の変更や、新しい分割結果の取得時には、古いCCS結果を非表示にします。

## アルゴリズム

本処理はAzevedoらの論文「A Split and Merge Strategy for Multi-objective Clustering Algorithms」
（DOI: `10.1007/s42979-025-04248-y`）のCCSを参考にした応用です。
MCA-II全体やCCSの完全再現ではなく、`ccs_face_centroids_v1`として記録します。

- 各三角形の重心を代表点とします。頂点のラベル付けは行いません。
- 代表点の平均をパーツ中心、中心からの最大距離を半径とする球を作ります。面積加重ではありません。
- 中心間距離が半径の和より小さい組を調べます。
- 相手の球の内部に入る代表点を再割り当て候補とします。球面上は内部に含めません。
- 重複領域外の代表点を基準点とし、それぞれのパーツの基準点への最近傍距離をKD-treeで比較します。
- 中心への距離で直接ラベルを決めるわけではありません。同距離なら元の所属を維持します。
- パーツID順に組を処理し、各組の中では基準点を固定して候補面を同時に更新します。
- 反復ごとに中心・半径を計算し直し、ラベル変化なし、既出の状態、反復上限のいずれかで停止します。

論文の処理とは異なり、少数クラスタの統合は行いません。
空パーツ、重複領域に候補点がない組、重複領域外の基準点が残らない組はスキップし、理由を記録します。
既に空のパーツを復活させず、非空パーツを空にする更新も行いません。
全ての面は常に一つの有効なパーツIDを持ちます。点・面の削除、頂点移動、面の細分化、穴埋めは行いません。

## 保存と追跡

従来の`planning/<plan_id>/segmentations/<segmentation_id>/`に新しいIDで保存します。
元の分割結果と、元結果を示す`segmentation.json`は上書きしません。
最新のCCS結果への参照だけを`planning/<plan_id>/ccs_refinement.json`へ保存します。

新しい結果のJSONには以下を記録します。

- `parent_segmentation_id`: 入力に使った分割結果。
- `method`: `ccs_face_centroids_v1`。
- `postprocessing`: 球の中心・半径の前後、変更面数、反復履歴、終了理由、各パーツの面数と連結成分数の前後、スキップ理由、補正時間。
- `total_processing_seconds`: 入力NPZ読込からGLB・NPZ再出力までの所要時間。最終メタデータ保存は含みません。
- `options`: 元のGPU分割設定。CCS設定は`postprocessing.options`に別途保存します。

JSONの`files`で、従来と同じ結果取得APIからGLB・NPZ・JSONを取得できます。
NPZの全体頂点・全体面と各面の順番は親結果と同じです。`face_part_ids`と独立パーツ配列を補正結果から作り直します。
元の面に対応する情報を維持するため、後の形状編集にも従来と同じ形式で渡せます。

## API

```text
POST /models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/refine-ccs
{"max_iterations": 5}
```

入力のモデル・プラン・分割IDの対応と、結果が正常完了していることを検証します。
新しい結果には新しい`segmentation_id`が付き、入力IDは`parent_segmentation_id`に残ります。
失敗時も親の分割結果は保持し、失敗した実行の`error.json`を別に記録します。

## 制約と検証

球の重複はメッシュの物理的な接触を意味しません。細長い形状、入り組んだ形状、薄い面同士では誤った再割り当てやスキップが起きる可能性があります。
基準点がない場合に、中心への距離だけで無理に割り当てるフォールバックは入れていません。
近接していても実際は別の面である場合を考慮した法線制約・測地距離は、今回導入していません。
連結成分数は共有辺で数え、距離による仮想接続や頂点の溶接は行いません。
補正後に連結成分が増えた場合は警告しますが、自動的に別の補正を重ねることはしません。
反復上限や状態の繰り返しで停止した場合も、その旨を警告します。改善・収束・連結性・境界の平滑さは保証しません。

テストでは既知の誤分類の修正、同距離維持、非重複、基準点なし、空パーツ、反復上限、形状不変、元ファイル不変、APIとUIの比較・再試行を検証します。
実モデルでの分割精度の改善は、WSLへ配置した後、補正前後を比較して確認してください。
