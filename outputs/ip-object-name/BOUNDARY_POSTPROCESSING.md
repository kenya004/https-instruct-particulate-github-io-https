# 2辺共有補正とCCSの順序切替

分割時には共有Edgeによる連結性の強制までを行い、2辺共有による境界補正は独立したボタンで実行します。境界補正とCCSは、WSLに保存済みのNPZからCPUで処理します。モデル・Gemini・Blenderの再実行は不要です。

「補正の順序」で「2辺共有補正 → CCS補正」「CCS補正 → 2辺共有補正」を選べます。選択順にボタンを並べ、前段の結果取得が完了するまで後段を無効にします。

## 更新

WSLで8004番のAPIを`Ctrl+C`で停止し、同じターミナルで実行してください。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
for file in connectivity.py segmentation.py boundary_postprocessing.py ccs_postprocessing.py workflow_api.py; do
    cp "$bundle/ip_object_name/$file" ip_object_name/
done
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
```

モデル・Blenderの環境変数は現在のターミナルの設定を引き継ぎます。新しいターミナルでは[SEGMENTATION.md](SEGMENTATION.md)の起動設定も行います。追加パッケージとAPIキーの再設定は不要です。

WindowsのStreamlitは、この作業フォルダの更新済み`app.py`を再読み込みします。更新されなければ、現在使用中のポートで同じサーバーを再起動してください。

旧版の`shared_edge_connectivity_v3`では境界補正が自動で含まれていました。その結果には補正前の状態が残っていないため、一度「再分割」を実行してください。旧版の自動補正記録がある結果に対しては、新しい境界補正ボタンを無効にし、APIも要求を拒否します。

## 操作と入力元

1. 「分割を実行」または「再分割」で、分割・連結性強制の結果を保存します。
2. 「補正の順序」を選びます。前段は分割直後のNPZ、後段は前段の結果を入力にします。
3. 上から順に補正ボタンを押します。「2辺共有補正 → CCS補正」なら分割→境界→CCS、「CCS補正 → 2辺共有補正」なら分割→CCS→境界です。各ボタンの上に実際の入力元を表示します。片方だけ使う場合は、その補正を先にする順序を選んで前段だけ実行します。
4. 「表示結果」で、選んだ順序の分割直後・前段後・後段後を比較します。表示だけを分割直後へ切り替えても、後段の入力元は前段の結果のままです。
5. 選択中の段階のGLB・NPZ・JSONをダウンロードし、その段階のモデルを編集できます。

前段の再実行は分割直後から、後段の再実行は現在の前段の結果から開始します。前回の同じ段階の結果に重ねて適用しません。各実行には新しい分割IDを発行し、過去のファイルは残します。

UIセッション中は2通りの順序の結果を別々に保持し、順序を切り替えるとその順序の計算済み結果を復元します。切り替えだけではAPI実行や分割推論を行いません。

新しい分割後は両順序の補正結果をUIから外します。前段の再実行が成功した後は、選択中の順序の後段だけをUIから外し、もう一方の順序の結果は保持します。実行そのものに失敗した場合は、以前の成功結果を保持します。結果取得に失敗した場合は、該当ボタンが「結果取得を再開」に変わり、処理を繰り返さず残りのファイルを取得します。順序を切り替えて戻ってきても、途中の取得を再開できます。

## アルゴリズムと診断

移動先と2本以上の異なるEdgeを共有する境界Faceを、境界Edgeの総本数の減少量、次に境界長の減少量が大きい順に逐次移動します。パーツ面積による方向制限はありません。1面ごとに周囲を再評価し、古い優先度を無効化します。パーツの消失・分断を防ぎ、条件を両立できないFaceは保持します。座標が完全一致する重複頂点は判定時だけ同一視します。詳しい条件は[CONNECTIVITY.md](CONNECTIVITY.md)を参照してください。

通常の三角形で非多様体Edgeを除くと、2本以上のEdgeを共有できる別ラベルの候補は最大1つです。この保存済みデータからの補正は、モデルの点ごとの推論確率を必要としません。

結果JSONの`postprocessing`と`diagnostics.boundary`に、変更面数・面積・優先規則・境界Edge数と長さの前後・移動元と先・未解消Faceと理由を記録します。UIにはこれらの集計と、同じ優先度の候補が競合した回数を表示します。同点ではFace番号を使うため順序依存は残ります。移動の詳細は先頭100回まで記録します。

1回の移動で境界Edgeの総本数が必ず減ることを検証し、無限ループを防ぎます。これは滑らかな境界や平面の断面を必ず得る保証ではありません。小さいパーツの面数が減る場合もありますが、最低1面は保持します。

CCSはさらにFaceの所属を変更するため、境界補正で満たした2辺共有の条件をCCS後も保証しません。段階を切り替えて確認してください。形状を新しく切断したり、境界の蓋を作る処理ではありません。

## APIと保存

`POST /models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/refine-boundary`へ空JSON `{}` を送ります。指定するIDは入力にする結果のIDで、分割直後やCCS後の正常完了した結果を使えます。モデル・プラン・元モデルのハッシュ・パーツIDと名前の一致を検証します。

応答は`method=two_internal_edges_boundary_gain_v2`、`parent_segmentation_id=入力した結果ID`を含みます。`processing_order`に実際に適用した補正のmethodを順に記録します。旧版の`two_internal_edges_large_to_small_v1`の結果も保存済みなら表示できます。GLB・NPZ・JSONは従来と同じファイル取得APIで取得します。

```text
planning/<plan_id>/
  segmentation.json          分割直後の結果
  boundary_refinement.json   最新の2辺共有補正結果
  ccs_refinement.json        最新のCCS結果
  segmentations/<各段階のID>/
    parts.glb
    parts.npz
    parts.json
    request.json
    error.json               失敗時
```

親IDは選んだ順序の入力と出力の関係を記録します。`boundary_refinement.json`と`ccs_refinement.json`は各処理の最新結果への参照で、順序別の一覧ではありません。各段階の実ファイルは独立したIDのフォルダに残ります。パーツID・名前・元の頂点とFace配列は維持します。

## 検証範囲

保存したNPZから、境界→CCSとCCS→境界の両方で前段のラベルが後段へ渡ることを検証します。親IDと補正順の保存、順序切替時の結果復元、選択中の前段だけの再実行、両順序の状態消去、取得途中の順序切替と再開、旧版の自動適用結果の検出、UIボタン順と入力元表示、3段階の表示切り替えをテストします。外部モデルの推論精度は実際のWSL環境で確認してください。
