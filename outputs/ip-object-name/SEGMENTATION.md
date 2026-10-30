# パーツ構成からメッシュを分割する

## WSLへ更新を配置

起動中のAPIを`Ctrl+C`で停止し、同じWSLターミナルで実行してください。
Instruct-Particulate本体とAPIキー設定は変更しません。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/segmentation.py" ip_object_name/
cp "$bundle/ip_object_name/ccs_postprocessing.py" ip_object_name/
cp "$bundle/ip_object_name/workflow_api.py" ip_object_name/
cp "$bundle/requirements-object-name.txt" .
pip install -r requirements-object-name.txt

export IP_OBJECT_NAME_MODEL=gemini-3.8-flash
export IP_PART_PLANNER_MODEL=gemini-3.8-flash
export BLENDER_BIN=/usr/bin/blender
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
```

初めて準備APIを配置する場合は、先に[PREPARATION_API.md](PREPARATION_API.md)を実行してください。
Windows側は更新済みのStreamlitを再読み込みします。自動更新されなければ、同じ`app.py`を再起動してください。

## 操作

1. GLB・上方向・編集要求を入力し、パーツ構成を作成する。
2. パーツ構成を確認して「分割を実行」を押す。名前推定やパーツリスト生成は再実行しない。
3. 分割結果を全体表示またはパーツ単独表示で確認する。
4. GLB・NPZ・対応表JSONを取得する。

分割後に「CCS補正を実行」を押すと、CPU上で面の所属を再判定できます。
元の分割結果は残し、「補正前」「CCS補正後」を比較します。詳細は[CCS_POSTPROCESSING.md](CCS_POSTPROCESSING.md)を参照してください。

推論はWSL側のGPUを利用します。初回のみ既存デモのモデル読み込み機能を使い、以後は重みを同じAPIプロセス内で再利用します。
使用するテキストはプランの英語`name`です。`description`は記録用であり、モデルのテキスト条件には連結していません。
`joint_specs=[]`、`decode_joint_parameters=False`で呼び出すため、架空の関節は追加しません。
一つのパーツだけの構成は全ての面をそのパーツに割り当て、GPU推論を省略します。

既定値は各面1点、推論バッチ2048、厳密な面ラベル後処理あり、パーツごとの連結強制ありです。
「推論設定」で面ごとの点数・バッチサイズ・連結強制を変更できます。
VRAM不足なら他のGPU処理を停止し、バッチサイズを512などへ下げて再試行してください。
ただし、バッチサイズは全ての特徴計算のメモリを制限するものではなく、6GBでの全モデル動作を保証しません。

## 保存先と対応

```text
data/models/<model_id>/planning/<plan_id>/
  part_plan.json
  segmentation.json                最新の成功結果
  segmentations/<segmentation_id>/
    request.json                    英語名称・上方向・推論設定
    parts.glb                       非空パーツごとの独立メッシュ
    parts.npz                       全体の分割記録と独立パーツ配列
    parts.json                      ID・名前・ノード・配列の対応表
    error.json                      失敗時のみ
```

パーツの識別には`model_id + plan_id + segmentation_id + part_id`を使用します。
パーツIDはプランの0始まりのIDを維持し、空パーツを除いて詰め直すことはしません。
割り当て面がないパーツはGLBに形状を作らず、JSONに面数0として記録し、警告します。
全ての面について有効なパーツIDが一つあることを出力時に検証します。負のIDや範囲外IDがある場合は成功扱いにしません。
これは面割り当ての網羅性の検証であり、意味的な分割の正確性や形状の自己交差の検証ではありません。

## 後のPython編集への受け渡し

`parts.glb`は一つのシーンです。各パーツは`part_0000`などの独立メッシュ、`node_part_0000`などのノードとして格納します。
各メッシュは固有の頂点配列・ローカル面インデックスを持ち、ノード変換は単位行列です。
全パーツを入力GLBのシーン座標系に置き、個別に中心化しません。
推論で使った向き変更・正規化を出力へ持ち込まず、入力寸法・配置を維持します。物理単位は推定・変更しません。
GLBは仕様上の浮動小数点精度への変換があるため、数値がビット単位で一致することは保証しません。
元のテクスチャは複製せず、パーツ識別用の色を付けます。

`parts.npz`のキーは次のとおりです。`allow_pickle=False`で読み込めます。

- `vertices`、`faces`、`face_part_ids`: 分割時の全体形状と各面の所属。元の記録として保持します。
- `part_0000_vertices`、`part_0000_faces`: パーツ0の独立した形状配列。
- `part_0000_source_vertex_indices`、`part_0000_source_face_indices`: 全体配列への対応。
- 他のパーツも同じ命名規則です。JSONの`npz_prefix`で配列名を取得できます。

面番号はInstruct-Particulateが読み込んで結合した三角形メッシュ内の番号です。元GLBの各プリミティブの面番号とは区別します。
後の編集処理では、独立パーツ配列またはGLBの対応メッシュを読み込み、変更したパーツから表示用GLBを再生成できます。
NPZの全体配列と独立パーツ配列は、今回のエクスポート時点の同じ形状を表します。編集後の同期処理はまだ実装していません。
境界の頂点は各パーツへ複製します。これは独立編集のためであり、境界を自動で溶接したり接続を維持したりする機能ではありません。

穴埋め、水密化、接続位置の補正、3Dプリント向けの立体化は行いません。
元メッシュの面を取り分けるため、一体成形の物体では各パーツが開いた表面になる場合があります。

## API

`POST /models/{model_id}/plans/{plan_id}/segment`へ空JSONまたは推論設定を送信します。
応答の`files`にはGLB・NPZ・JSONの取得URLが入ります。
取得は`GET /models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/files/{filename}`です。
取得可能なファイルは3種類に限定し、モデル・プラン・分割IDの対応を検証します。
Windows側はWSLパスを直接参照せず、このAPIで取得します。
分割失敗時も入力GLB・名前・プランを保持します。結果取得だけに失敗した場合、同じUIセッションで再試行すれば取得を再開します。

## 検証の範囲

テストでは実際のGLB・NPZを生成し、全ての面が一度だけ出力されること、ID対応、独立頂点、入力配置、API取得、単独表示と状態管理を検証します。
推論アダプタのテストはモックです。実際のWSLのモデル・GPUでの推論と分割精度は、配置後に確認が必要です。
