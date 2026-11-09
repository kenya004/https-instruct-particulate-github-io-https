# SegmentDesign3D IP

元のSegmentDesign3Dを残したまま、Instruct-Particulate用の入力フローを確認するWindows向けStreamlitプロジェクトです。
既存の二列レイアウトとPlotlyによるメッシュ表示のコードを基に、必要な部分を別フォルダへ移して作成しました。
元の`C:/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D`のファイルは変更していません。

現在の範囲は`GLB＋編集要求 → オブジェクト名推定 → パーツリスト作成 → 確認 → 分割・表示 → パーツごとの一様スケーリング・XYZ移動 → 再結合`です。
Rhino・Grasshopper・旧PARTFIELD APIは呼び出しません。スケーリング後は、基準パーツを固定して接続点へ位置を合わせる追従も利用できます。

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
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
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
入力・分割・パーツ編集・結合結果の3D表示は、すべて指定した上方向を保つTurntable Rotationで操作します。

## 操作

1. GLBを選択する。入力したモデルが右側に表示されます。
2. GLB内で物体の上に向かう軸を「モデルの上方向」で選ぶ。選択した軸を上に向けて、入力・分割・編集・結合の全ビューを表示します。方向を変えたら「パーツ構成を作成」から再実行します。
3. どのように編集したいかを文章で入力する。
4. 「パーツ構成を作成」を押す。
5. 物体名と、分割用の英語パーツ名・編集対象を確認する。UIのパーツ名にはInstruct-Particulateへ渡す`name`をそのまま使用します。
6. 「分割を実行」を押す。初回はGPUへの重みロードが必要です。
7. 分割結果の「表示パーツ」で全体・個別パーツを切り替える。
8. GLB・NPZ・対応表JSONをダウンロードする。
9. 「補正の順序」で「2辺共有補正 → CCS補正」または「CCS補正 → 2辺共有補正」を選ぶ。選んだ順にボタンが並び、前段は分割直後、後段は前段の結果をCPUで補正します。
10. 上から順に補正ボタンを押し、各段階を切り替えて比較する。順序を切り替えると、その順序の計算済み結果を復元します。前段を再実行すると選択中の順序の後段だけを無効にします。境界補正とCCSはGPU推論を呼び直しません。
11. 下段の「パーツ編集」で自動追従の基準パーツを選び、各パーツの倍率と移動量を変更する。移動の初期基準は接続断面の近似平面で、U/Vが平面内、Nが法線方向です。「移動方向の基準」で入力XYZにも切り替えられます。英語名のスライダーが並び、操作中に形状と位置が変化します。「接続位置に追従」は拡大縮小時に適用し、手動移動では接続点を維持しません。
12. 必要なら「境界なじませを適用するパーツ」を選ぶ。範囲の初期値は20%です。選択したパーツは境界を接続先に合わせ、内部へ向かって指定倍率に滑らかに戻ります。選択と範囲はUIで変更できます。
13. 「編集後 GLB」でPython側で計算した編集済みモデルをダウンロードする。
14. 「一つのMeshへ結合」を押す。元の接続境界を使った接続面を追加し、面色を保持した一つのMeshを確認する。「結合後 GLB」「結合後 NPZ」で保存できます。編集値やなじませ設定を変えたら、結合ボタンを押して更新してください。

「Faceの重なりを表示」は初期状態でオンです。スライダーを離すと移動・倍率・なじませ後の交差を検査し、未編集時にはない交差ペアのFaceだけを赤く表示します。元から存在する交差ペアは除外しますが、同じFaceが別のFaceと新しく交差した場合は表示します。編集は止めないため、赤色を見てさらにパーツを移動できます。結合後も元Faceの対応情報で比較し、追加した接続面との交差も検査します。赤色は表示専用で、出力GLB/NPZのパーツ色は保持します。

判定の中心・縮尺・許容誤差は未編集モデルに固定し、別パーツの移動で静止面の判定条件が変わることを防ぎます。平行移動・一様な拡大縮小だけのパーツ内部は新規交差から除外します。パーツ間の交差、境界なじませによる自己交差、結合で追加・変更された面の交差は検査します。

境界補正とCCSを順に使う前に、[追加ファイルの配置手順](../ip-object-name/BOUNDARY_POSTPROCESSING.md)でWSLのAPIを更新してください。旧版で自動境界補正された分割結果は、一度再分割が必要です。
スケーリングの定義、状態のリセット、表示とPythonの対応は[EDITING.md](EDITING.md)を参照してください。今回の編集機能追加にWSL側の更新は不要です。

結果のJSONをダウンロードできます。元モデルと処理結果はWSL側の`data/models/<model_id>`に保存されます。
上段の「入力モデル」は元のGLB、下段の「分割結果」は分割後の独立メッシュです。
要求文を変更すると前のパーツ表と分割表示を非表示にし、再実行時にLLMへ新しい要求を渡します。
同じモデル・向き・接続先なら登録と名前推定を再利用します。
分割結果はWSLに保存され、API経由でWindows側へ取得します。WindowsからWSLのファイルパスを直接開く必要はありません。
分割した面の保存形式と、後のPython編集への受け渡しは[SEGMENTATION.md](../ip-object-name/SEGMENTATION.md)を参照してください。

## 構成

```text
app.py              入力・状態表示・パーツ表
viewer.py           元の表示処理を基にしたGLBプレビュー
backend_client.py   WSLのAPIへの通信
workflow.py         登録→名前推定→パーツ構成と、確認後の分割・結果取得の状態管理
editing.py          パーツ読込・中心計算・スケーリング・XYZ移動・編集後GLB出力
connections.py      接続境界の検出・接続グラフの作成・平行移動による追従
movement_axes.py    元の接続境界を平面近似し、移動用の直交3軸を作成
mesh_overlaps.py    BVHと三角形判定による交差・同一平面の面積重複の検査
orientation.py/json 推論と同じ上方向への表示回転（Plotly・Three.jsで共通）
boundary_blending.py 元の共有境界からの距離・なじませ重み・Python側の局所変形
rejoining.py        元頂点対応を使った境界の橋渡し・色付きMeshの結合と出力
part_editor.py      Streamlitの編集状態とブラウザ側コンポーネントの接続
scale_component/   ドラッグ中に即時描画するThree.jsのUIとビルド済み配信用ファイル
```

## テスト

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

UIテストはファイルアップロードの操作を利用するため、作成時に検証したStreamlit 1.66.0以降を使用してください。
テストではGLBの読込と表示データ、入力操作、APIエラー、要求変更時の状態管理、独立スケーリングと編集後GLBを検証します。
外部APIはモックです。実際のWSL接続・Blender・Geminiの一連の動作は別途確認が必要です。
