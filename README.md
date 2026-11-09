# SegmentDesign3D IP Workspace

GLB入力、オブジェクト名推定、編集要求に応じたパーツリスト生成のための開発用ワークスペースです。
既存のSegmentDesign3Dは変更せず、別のWindows UIとWSLバックエンドを利用します。

## 構成

- `outputs/SegmentDesign3D-IP/`: Windows側のStreamlit UI。
- `outputs/ip-object-name/`: WSLのInstruct-Particulateへ配置する追加モジュール、テスト、手順書。
- `work/`: ローカルの検証用Python環境とログ。Git管理対象外。

## 起動と配置

1. [WSL側の配置・API起動](outputs/ip-object-name/PREPARATION_API.md)
2. [Windows側の環境構築・UI起動](outputs/SegmentDesign3D-IP/README.md)

UIからGLBと編集要求を送信し、VLMによる物体名推定後、テキストLLMでパーツ構成を生成します。
名前推定と同じ画像・VLM呼び出しで上方向を推定し、処理用モデルを＋Z・Z＝0へ回転・接地する自動姿勢合わせを追加しました。[WSL側の更新手順](outputs/ip-object-name/AUTO_ORIENTATION.md)を実行して利用してください。
パーツ構成の確認後、Instruct-Particulateによる分割・独立メッシュの表示と、各パーツの中心を基準にしたスケーリング、X/Y/Zの手動移動を実行できます。
接続境界があるパーツには、接続点を合わせる平行移動の追従も適用できます。編集方法と接続補正の範囲は[パーツ編集](outputs/SegmentDesign3D-IP/EDITING.md)を参照してください。
編集後は「一つのMeshへ結合」ボタンで元の境界を橋渡しし、パーツごとの面色を残したGLB・NPZを出力できます。面の交差を修正する処理は含みません。

## Git管理の範囲

このリポジトリはWindows側のワークスペースを管理します。
WSLの`~/git/instruct-particulate`は、既存の別リポジトリとして維持します。
ここでのコミットや変更が、WSL側へ自動反映されることはありません。

APIキーはWSL側のGit管理対象外の`ip_object_name/local_settings.py`で設定します。
秘密情報、仮想環境、入力モデル、生成結果、学習済み重みはコミットしないでください。
