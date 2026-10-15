# GLBからオブジェクト名を取得する

Instruct-Particulateの画像生成処理を利用し、Geminiから物体全体の名前だけを取得します。
パーツ分割・関節推定・形状編集・SegmentDesign3DのUIへの接続は、今回の実装には含めていません。

処理は `GLB → Blenderで4方向のPNGを生成 → Gemini → object_name.json` です。
`app.py`や`InstructParticulateApp`は読み込まず、分割用のモデル重みも読み込みません。
VLMの推論は外部APIで行います。画像生成には既存のBlenderスクリプトを使い、そのCycles/GPU設定を引き継ぎます。

フォルダへのGLB投入を入口にする場合は、[フォルダ監視の手順](WATCH.md)を参照してください。
既にAPIキーを書き込んだ`core.py`がある場合は、WATCH.mdの追加ファイルだけを配置する手順を使用してください。

APIキーをGit対象外のファイルに保存する場合は、[ローカル設定への移行手順](LOCAL_SETTINGS.md)を使用してください。
`core.py`に直接キーを貼った既存環境から、モデル設定を保持して移行できます。

GLBと編集要求をUIから入力し、名前推定後にパーツリストを作成する場合は、[準備APIの手順](PREPARATION_API.md)を参照してください。

## 1. WSLに配置する

WSLのターミナルで実行してください。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate

bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp -r "$bundle/ip_object_name" .
cp "$bundle/requirements-object-name.txt" .
pip install -r requirements-object-name.txt
```

追加パッケージは既存の`.venv`にインストールします。PyTorchやCUDAを再インストールするコマンドは含みません。

## 2. BlenderとAPIキーを設定する

```bash
command -v blender
```

Blenderが入っていない場合は、WSL用のBlenderをインストールしてください。
Ubuntuのパッケージを使用する場合は次のコマンドです。

```bash
sudo apt update
sudo apt install -y blender python3-numpy
```

既に別の場所にインストール済みなら、その実行ファイルを指定します。

```bash
export BLENDER_BIN="$(command -v blender)"
```

キーのファイル保存については[ローカル設定への移行手順](LOCAL_SETTINGS.md)を参照してください。
以下は環境変数を使う場合の設定です。既にローカル設定または環境変数を設定済みなら不要です。

```bash
read -rsp 'Gemini API key: ' GEMINI_API_KEY
export GEMINI_API_KEY
printf '\n'
```

Windows側の`gemini_api_key.txt`は自動では読み込みません。ローカル設定ファイルのキーを優先し、空なら環境変数を使います。

初期モデルIDは、確認した上流`app.py`と同じ`gemini-3.5-flash`です。
そのモデルを利用できない場合は、契約・APIで利用可能な画像入力対応Geminiモデルを指定してください。

```bash
export IP_OBJECT_NAME_MODEL='利用可能なGeminiモデルID'
```

上のモデル設定コマンドは、変更が必要な場合だけ実行します。

## 3. ローカル設定を確認する

```bash
python -m ip_object_name --check
```

この確認はファイル・依存関係・Blenderの場所・APIキーの有無だけを確認します。
APIキーの内容は出力しません。Blenderの実行成功やAPIの認証・モデル利用可否までは確認しません。

## 4. 画像生成だけを確認する

```bash
python -m ip_object_name \
  --mesh /mnt/c/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D/model/HeadPhoneStand54.glb \
  --up-dir=+Z \
  --render-only
```

この実行ではAPIキーもVLM呼び出しも不要です。生成された`renders/view_000.png`などを確認できます。
`--up-dir=+Z`は「読み込んだ形状の上方向が+Z」の場合の指定です。正面方向の指定ではありません。
向きが違う場合は`+X`、`-X`、`+Y`、`-Y`、`+Z`、`-Z`から選んでください。負の方向は`--up-dir=-Y`のように指定します。
RhinoからのGLB書き出しで軸が変わる場合があるため、実際の画像を確認してください。

## 5. オブジェクト名を取得する

```bash
python -m ip_object_name \
  --mesh /mnt/c/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D/model/HeadPhoneStand54.glb \
  --up-dir=+Z
```

JSON出力例です。推定結果は形状によって異なります。

```json
{
  "model_id": "実行ごとのID",
  "object_name": "ヘッドホンスタンド",
  "status": "identified",
  "up_dir": "+Z"
}
```

実際の応答には、保存先・画像パス・元ファイルのSHA-256・使用したVLMモデルIDも含みます。
JSONは標準出力、Blenderなどの実行ログは標準エラーへ出ます。
`--render-only`と名前推定は独立した実行であり、名前推定時には再度画像を生成します。

出力先は次の構成です。元GLBをそのまま保持し、後の分割処理にも使えるようにしています。

```text
data/object_names/<model_id>/
  input.glb
  object_name.json
  renders/
    view_000.png
    view_000_camera.npz
    ...
```

`object_name`が`不明`の場合はVLMが物体の種類を判別できなかったことを表します。
画像生成・API通信に失敗した場合は名前を捏造せず、エラーを返します。
失敗後の画像などは調査できるように出力先に残します。

## 6. APIとして起動する

同じWSLターミナルで、上記の環境変数と`.venv`が有効な状態で実行します。

```bash
cd ~/git/instruct-particulate
python -m uvicorn ip_object_name.api:app --host 0.0.0.0 --port 8004 --workers 1
```

既存の8001/8002/8003ポートとは分けています。8004が使用中なら別の空きポートに変更してください。
同時実行によるBlender/GPUの競合を避けるため1ワーカーで使用します。同時に別の要求が来た場合は409を返します。

別のWSLターミナルから実行する例です。

```bash
curl --fail-with-body http://localhost:8004/identify-object \
  -F 'file=@/mnt/c/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D/model/HeadPhoneStand54.glb' \
  -F 'up_dir=+Z'
```

WindowsのPowerShellから送る場合は、Windows側のファイルパスを使用します。

```powershell
curl.exe --fail-with-body http://localhost:8004/identify-object `
  -F "file=@C:/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D/model/HeadPhoneStand54.glb" `
  -F "up_dir=+Z"
```

Windowsからlocalhostで到達できないWSL設定の場合は、接続先をWSLのIPアドレスに変更してください。
受け付けるファイルは最大100 MiBのGLBです。

`GET /health`はサーバーの生存確認です。Blender・APIキーの動作確認ではありません。
入力不正は422、サイズ超過は413、環境設定不足は503、VLMの失敗は502を返します。

## 設定一覧

| 環境変数 | 初期値・用途 |
|---|---|
| `INSTRUCT_PARTICULATE_REPO` | 現在のディレクトリ。clone先を指定 |
| `IP_OBJECT_NAME_OUTPUT_ROOT` | `<clone先>/data/object_names` |
| `IP_OBJECT_NAME_MODEL` | `gemini-3.5-flash`。利用可能なモデルに変更可 |
| `IP_OBJECT_NAME_UP_DIR` | `+Z` |
| `BLENDER_BIN` | 未指定時は上流コードが自動検出 |
| `GEMINI_API_KEY` / `GOOGLE_API_KEY` | Gemini APIキー |

CLIでは`--repo`、`--output-dir`、`--model`、`--up-dir`、`--blender-bin`で上書きできます。

## テストと今回の検証範囲

既存のInstruct-Particulate環境でテストする場合は、バンドルのディレクトリで実行します。

```bash
pip install httpx trimesh numpy
cd "$bundle"
python -m unittest discover -s tests -v
```

テストでは実際のGLBの読込・保持、APIへのアップロード、向きの受け渡し、VLMへの画像送信データ、エラー処理を検証します。
Blenderと外部VLM応答はモックに置き換えます。実際の名前推定の品質やWSL上のGPUレンダリングの成功を保証するテストではありません。

作成環境からWSLサービスへの接続が拒否されたため、このバンドルをclone先へ直接配置しての実行は行っていません。
実GLB・Blender・有効なAPIキーを使った最終確認は、上記の手順4と5で行ってください。
