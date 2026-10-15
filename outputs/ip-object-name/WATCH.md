# フォルダ投入によるオブジェクト名推定

今回の処理は次のとおりです。

```text
data/inbox/にGLBを追加
  → ファイルのサイズと更新時刻が2秒間変わらないことを確認
  → model_idを発行し、元GLBをdata/models/<model_id>/input.glbへコピー
  → Blenderで4方向の画像を生成
  → Geminiに名前を問い合わせ
  → 名前・画像・設定・処理状態を同じモデルフォルダへ保存
```

パーツリストの作成、セグメンテーション、編集、UIへの接続はまだ実行しません。
入力ファイル名やフォルダ名はVLMへの指示文に含めません。具体的な物体名の例を削除したプロンプトを使用します。

## 1. 追加ファイルをWSLへ配置する

次をWSLで実行してください。既存の`core.py`はコピーしないため、そこに入力済みのAPIキーとモデル設定は保持されます。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate

bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/store.py" ip_object_name/
cp "$bundle/ip_object_name/watch.py" ip_object_name/
cp "$bundle/ip_object_name/object-name-system-prompt.md" ip_object_name/
pip install 'filelock>=3.13,<4'
```

Blender・NumPy・Gemini APIキーは、単体での名前推定に成功した環境をそのまま使用します。
必要な場合は`export BLENDER_BIN=/usr/bin/blender`を実行してください。

## 2. 監視を開始する

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
python -m ip_object_name.watch --model gemini-3.8-flash --up-dir=+Z
```

`data/inbox`と`data/models`は自動作成されます。既にinbox内にある未処理GLBも対象です。
ターミナルを開いたままにしてください。停止は`Ctrl+C`です。
処理は1件ずつ順番に実行します。同じ保存先を別の監視プロセスが使用している場合は起動を拒否します。

`--up-dir`は投入するモデルの上方向に合わせてください。この段階では監視コマンドで指定した向きを全新規モデルに適用します。
向きが混在する場合は、まずモデルの向きを統一するか、監視を止めて向き別に処理してください。
モデルごとの向きをUIから受け取る処理は後続実装です。

## 3. 別のWSLターミナルからモデルを投入する

コピー完了を明確にするため、`.partial`という一時名でコピーし、完了後に`.glb`へ名前を変えます。

```bash
cd ~/git/instruct-particulate
mkdir -p data/inbox
cp "/mnt/c/Users/mrkab/GH_hops/SegmentDesign3D/SegmentDesign3D/model/HeadPhoneStand54.glb" \
  data/inbox/HeadPhoneStand54.glb.partial
mv data/inbox/HeadPhoneStand54.glb.partial data/inbox/HeadPhoneStand54.glb
```

inbox内の既存ファイルと名前が重ならない投入名を使用してください。
エクスプローラーからGLBを置くこともできますが、サイズ・更新時刻の安定だけではコピー完了を完全には保証できません。
大きいファイルや遅いストレージでは、一時名からの変更を使用してください。
監視するのはフォルダ直下の`.glb`だけです。サブフォルダや`.partial`ファイルは対象にしません。

Windows側の投入フォルダを直接監視することもできます。

```bash
python -m ip_object_name.watch \
  --inbox /mnt/c/Users/mrkab/Desktop/ip_inbox \
  --model gemini-3.8-flash \
  --up-dir=+Z
```

この場合も登録済みモデルは、既定ではWSLの`data/models`に保存します。

## 4. 結果を確認する

監視側のターミナルに次のように表示されます。

```text
[processing] HeadPhoneStand54.glb -> <model_id>
[completed] HeadPhoneStand54.glb: <推定した名前> (<model_id>)
```

保存構成は次のとおりです。

```text
data/models/<model_id>/
  input.glb                       元モデルの保存用コピー
  metadata.json                   ID・元ファイル情報・向き・状態・推定名
  recognition/
    object_name.json              完了した最新の推定結果
    <run_id>/
      system_prompt.md            実際に使用したシステムプロンプト
      request.json                モデルID・SDK版・画像生成条件など
      object_name.json            この実行の推定結果（成功時）
      error.json                  エラー詳細（失敗時）
      renders/
        view_000.png
        view_000_camera.npz
        ...
```

推定結果の`input_mesh`は登録した`input.glb`を参照します。名前推定用に元GLBを再度コピーしません。
登録処理は元ファイル名・元のSHA-256・登録時の上方向を保存し、入力形状を変換・上書きしません。
Blender内では描画用の向き調整等が適用されます。単位はこの段階では推定せず、`units`を`null`にします。

状態は`pending`（待機）、`processing`（処理中）、`completed`（完了）、`failed`（失敗）です。
`object_name`が`不明`の場合は、処理の失敗とは区別して、VLMがカテゴリを判断できなかった結果として保存します。

## 再起動・再試行

- 同じパス・サイズ・更新時刻の入力は、監視を再起動しても登録情報を再利用します。完了済みなら再問い合わせしません。
- inboxのファイルは自動削除しません。削除しても登録した`input.glb`と推定結果は残ります。
- 同じ名前でもサイズや更新時刻が変われば、新しい入力として別の`model_id`を発行します。
- 同一内容を別名で投入した場合も、新しい入力として扱います。SHA-256による内容の重複排除は行いません。
- 失敗したモデルは自動では繰り返し実行しません。通信失敗などを修正後、以下で再試行できます。

```bash
python -m ip_object_name.watch --model gemini-3.8-flash --up-dir=+Z --retry-failed --once
```

このコマンドは、inboxに残っている失敗入力を、同じモデルIDで実行ごとに1回再試行します。
完了済みの入力はスキップします。処理中に停止したモデルは、次回起動時に失敗（`Interrupted`）として記録します。
実行ごとの画像・設定・エラーを残すため、再試行の結果が過去の実行を上書きしません。
登録済みの上方向は維持されます。

常駐せず、現在投入されているファイルを処理して終了するには`--once`を使います。

```bash
python -m ip_object_name.watch --model gemini-3.8-flash --up-dir=+Z --once
```

その実行で処理したモデルに失敗があれば終了コードは1です。過去の失敗をスキップしただけの場合は0です。
起動中の常駐監視を停止してから、同じ保存先に対する`--once`や再試行を実行してください。

## 既存機能との関係

従来の`python -m ip_object_name --mesh ...`と`POST /identify-object`はそのまま使用できます。
これらの保存先は従来の`data/object_names`です。新しいモデル登録方式を使用する入口は、現時点ではフォルダ監視です。
将来UIから登録する場合は、`ModelStore.register()`と`ModelStore.recognize()`をAPIから呼び出す形にできます。

## 検証

```bash
cd "$bundle"
python -m unittest discover -s tests -v
```

テストには既存のバンドルのテスト依存関係（`httpx`・`trimesh`・`numpy`等）と`filelock`が必要です。
実ファイルの投入・登録・コピー中の変更検知・再起動・失敗と再試行・同時起動防止を検証しています。
今回の変更に対するBlenderとVLM呼び出しはモックで検証しており、WSL上でのフォルダ監視からの実推論は未確認です。
