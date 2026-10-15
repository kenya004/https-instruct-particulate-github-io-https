# SegmentDesign3D IP

元のSegmentDesign3Dを残したまま、Instruct-Particulate用の入力フローを確認するWindows向けStreamlitプロジェクトです。
既存の二列レイアウトとPlotlyによるメッシュ表示のコードを基に、必要な部分を別フォルダへ移して作成しました。
元の`C:/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D`のファイルは変更していません。

現在の範囲は`GLB＋編集要求 → オブジェクト名推定 → パーツリスト作成`です。
Rhino・Grasshopper・旧PARTFIELD APIは呼び出しません。スライダー編集やセグメンテーションもまだ実行しません。

## 配置

この`SegmentDesign3D-IP`フォルダが新しいUIプロジェクトです。
既存の仮想環境・APIキーファイル・生成データ・`.git`はコピーしていません。
後でこのフォルダを独立したWindows側のリポジトリとして管理できます。

## 1. WSLの準備APIを起動

まず、隣の`ip-object-name/PREPARATION_API.md`の手順で追加ファイルを配置し、APIを起動します。
現在のInbox監視は停止してください。新しいUIから登録するので、フォルダへの手動投入は不要です。

WSLでの起動コマンドは次のとおりです。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
export IP_OBJECT_NAME_MODEL=gemini-3.8-flash
export IP_PART_PLANNER_MODEL=gemini-3.8-flash
export BLENDER_BIN=/usr/bin/blender
python -m uvicorn ip_object_name.workflow_api:app --host 0.0.0.0 --port 8004 --workers 1
```

GeminiのAPIキーは、これまで設定したWSLの`local_settings.py`を使用します。
名前推定では4方向の画像を渡し、その後のパーツリスト作成では推定名と要求文だけを渡します。

## 2. WindowsでUIを起動

以下はWindowsのPowerShellで実行します。
元のSegmentDesign3Dの仮想環境は変更しません。

```powershell
cd "C:\Users\mrkab\Documents\Codex\2026-09-26\https-instruct-particulate-github-io-https\outputs\SegmentDesign3D-IP"
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m streamlit run app.py --server.port 8502
```

既存のUIとポートを分けています。8502が使用中なら別の番号に変更してください。
ブラウザで`http://localhost:8502`を開きます。
画面の接続設定は初期値が`http://localhost:8004`です。WSLへのlocalhost転送が使えない場合はWSLのIPアドレスへ変更します。

## 操作

1. GLBを選択する。入力したモデルが右側に表示されます。
2. モデルの上方向を選ぶ。
3. どのように編集したいかを文章で入力する。
4. 「パーツ構成を作成」を押す。
5. 物体名と、日本語表示名・分割用英語名称・編集対象を確認する。

結果のJSONをダウンロードできます。元モデルと処理結果はWSL側の`data/models/<model_id>`に保存されます。
Windows側のプレビューは元のGLBです。この段階では分割後の形状を表示しているわけではありません。
要求文を変更すると前のパーツ表を非表示にし、再実行時にLLMへ新しい要求を渡します。
同じモデル・向き・接続先なら登録と名前推定を再利用します。

## 構成

```text
app.py              入力・状態表示・パーツ表
viewer.py           元の表示処理を基にしたGLBプレビュー
backend_client.py   WSLのAPIへの通信
workflow.py         登録→名前推定→パーツ構成の順序と状態管理
```

## テスト

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

UIテストはファイルアップロードの操作を利用するため、作成時に検証したStreamlit 1.66.0以降を使用してください。
テストではGLBの読込と表示データ、入力操作、APIエラー、要求変更時の状態管理を検証します。
外部APIはモックです。実際のWSL接続・Blender・Geminiの一連の動作は別途確認が必要です。
