# GLB・編集要求からパーツリストを作成するAPI

元のSegmentDesign3Dを変更せず、別のWindows UIから利用するための追加APIです。
VLMによる名前推定と、その名前・編集要求を入力するテキストLLMの呼び出しをWSL側で順に実行します。
両方にGeminiを利用しますが、LLMのパーツリスト作成に画像やGLBは渡しません。
APIキーは既存の`ip_object_name/local_settings.py`を使用します。

## WSLへ配置する

起動中のフォルダ監視を`Ctrl+C`で停止してください。
監視とこのAPIは同じモデル保存先を使うため、同時起動時は処理要求が409になります。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate

bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/planning.py" ip_object_name/
cp "$bundle/ip_object_name/workflow_api.py" ip_object_name/
cp "$bundle/ip_object_name/segmentation.py" ip_object_name/
cp "$bundle/ip_object_name/ccs_postprocessing.py" ip_object_name/
cp "$bundle/ip_object_name/part-plan-system-prompt.md" ip_object_name/
cp "$bundle/requirements-object-name.txt" .
pip install -r requirements-object-name.txt
```

`core.py`、`credentials.py`、`local_settings.py`、既存の入力モデルは上書きしません。

## 起動

```bash
export IP_OBJECT_NAME_MODEL=gemini-3.8-flash
export IP_PART_PLANNER_MODEL=gemini-3.8-flash
export BLENDER_BIN=/usr/bin/blender

python -m uvicorn ip_object_name.workflow_api:app \
  --host 127.0.0.1 --port 8004 --workers 1
```

以前の名前推定APIを8004で動かしている場合は、それを停止してから起動してください。
名前推定モデルとリスト作成モデルは、上記の環境変数で別々に指定できます。
APIキーをWindows側へコピーする必要はありません。
このAPIには認証機能を設けていないため、PC内の利用に限定します。
Windows側からはWSLのlocalhost転送を使い、`http://localhost:8004`へ接続します。

## 呼び出しの順序

1. `POST /models`へGLB・編集要求・上方向をmultipart/form-dataで送信する。
2. 受信した`model_id`を使って`POST /models/{model_id}/recognize`を呼び出す。
3. `POST /models/{model_id}/parts`へ編集要求をJSONで送る。

今回のWindows UIは、この順序を一回のボタン操作で実行します。
登録したGLB・上方向・接続先が同じなら、編集要求を変更しても同じモデルIDと推定名を再利用します。
UIを再起動・再読込した場合、セッション情報が消えるため新しい登録になります。

| エンドポイント | 入力 | 出力 |
|---|---|---|
| `GET /health` | なし | 生存状態・使用モデルID |
| `POST /models` | `file`、`edit_request`、`up_dir` | 登録情報、`model_id` |
| `GET /models/{model_id}` | モデルID | 現在の登録情報 |
| `POST /models/{model_id}/recognize` | モデルID | 推定名・登録情報 |
| `POST /models/{model_id}/parts` | `{"edit_request": "編集要求"}` | パーツ構成 |
| `POST /models/{model_id}/plans/{plan_id}/segment` | 推論設定のJSON（空オブジェクト可） | 分割結果・取得先URL |

名前推定の失敗後に明示して再試行する場合は`/recognize?retry=true`を使用します。
UIの再実行ボタンはこの指定を使います。処理が完了していればVLMを再呼び出ししません。

## パーツリスト

`parts`の各項目は、0から連番の`part_id`、分割用の英語`name`と`description`、日本語の`label`、編集対象を示す`is_edit_target`を持ちます。
`part_names`は分割用名称だけの配列です。物体名・要求文・LLMモデルID・実行IDも結果に含みます。
一つのモデルに対して、要求文ごとに異なるパーツ構成を保存できます。
モデルIDは同じでも、パーツIDの対応はプランごとに決まるので、編集対象は`model_id + plan_id + part_id`で区別します。

```text
data/models/<model_id>/
  input.glb
  metadata.json
  edit_request.json
  recognition/...
  planning/
    part_plan.json                 最新の成功結果
    <plan_id>/
      request.json                 名前・要求文・モデル設定
      system_prompt.md             実際の指示文
      part_plan.json               成功したパーツ構成
      error.json                   失敗時の記録
```

物体名の推定が終わっていない場合は、パーツリストを生成しません。
物体名が`不明`の場合もエラーを返します。
名前の推定が成功し、その後のリスト作成だけに失敗した場合は、元モデルと推定名を保持します。

この段階のパーツ構成は、名前と要求文に基づく候補です。実形状との対応は未検証です。
LLMには、物体名から構成部品を考え、編集要求に応じて分割粒度を決めるよう指示しています。
全領域をいずれか一つのパーツへ割り当てる重複のない構成とし、未編集領域も含めます。
形状変更後に接続先の位置を独立に調整する必要がある場合、そのパーツを分離する方針です。
ただし、領域の網羅性・非重複性・接続関係の維持を幾何学的に検証する機能ではありません。
パーツ構成の確認後、別ボタンからセグメンテーションを実行できます。
配置手順、出力データ、制約は[SEGMENTATION.md](SEGMENTATION.md)を参照してください。
分割後の任意のCCS補正と比較については[CCS_POSTPROCESSING.md](CCS_POSTPROCESSING.md)を参照してください。
形状編集・接続位置の補正・関節種別の生成はまだ実装していません。

## 検証

既存テストを含めてAPIのアップロード、モデルIDの受け渡し、要求変更、保存、エラー処理を検証しています。
BlenderとGemini呼び出しはモックです。実際のWSLとの通信とLLM出力品質は、上記のAPIを起動して確認してください。
