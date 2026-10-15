# APIキーをGit対象外のファイルへ移す

キーは`ip_object_name/local_settings.py`に保存し、Gitで共有するのは空のテンプレート`local_settings.example.py`だけにします。
既存の環境変数も使えます。優先順位は、ローカル設定の非空キー、`GEMINI_API_KEY`環境変数、`GOOGLE_API_KEY`環境変数の順です。

## 現在のWSL環境を移行する

1. 監視プログラムやAPIサーバーが起動中なら`Ctrl+C`で停止してください。
2. WSLで次を実行します。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate

bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
python "$bundle/install_local_settings.py" --repo "$PWD"
```

移行スクリプトは以下を行います。`git add`・commit・pushは行いません。

- 以前`core.py`に直接追加した`os.environ["GEMINI_API_KEY"] = "..."`のキーを、表示せずに移します。
- キーを返す`_api_key()`と、設定確認の`api_key_configured`項目を更新します。
- `core.py`のモデルIDなど、その他の設定は保持します。
- `credentials.py`と、キーが空のテンプレートを追加します。
- 既存の`.gitignore`を残して、ローカル設定とPythonキャッシュの除外規則を追記します。
- WSLでは`local_settings.py`のアクセス権を所有者だけが読み書きできる`600`にします。

想定する表示は次のとおりです。

```text
Local settings installed. Existing model settings were preserved. No Git commands were run.
API key configured: yes
```

すでに`local_settings.py`に非空のキーがある場合は、そのファイルを優先し、キーは上書きしません。
二度実行してもGit除外規則を重複して追加しません。
APIキーを検出できなかった場合は空の設定ファイルを作るので、次の手動編集で記入してください。

```bash
nano ip_object_name/local_settings.py
```

```python
GEMINI_API_KEY = "ここに自分のキーを記入"
```

キーを変更するときもこのファイルを編集し、監視プログラムやAPIを再起動してください。
`credentials.py`や`core.py`へキーを記入する必要はありません。

## 読み込みとGit除外の確認

```bash
python -m ip_object_name --check --model gemini-3.8-flash
git check-ignore -v ip_object_name/local_settings.py
```

`api_key_configured`が`true`で、2番目のコマンドに`.gitignore`の除外規則が表示されれば設定完了です。
これらはAPIキーの値を出力しません。`--check`は実際のAPI認証までは確認しません。

今回まだGitの登録操作をしていない場合は、この確認後にコミットの準備へ進めます。
以前にローカル設定を`git add`したことがある場合は、`.gitignore`では追跡を解除できません。
その場合は内容を表示しない次の確認でファイル名が出るか調べてから、別途追跡解除が必要です。

```bash
git ls-files -- ip_object_name/local_settings.py
```

## Gitで共有するファイル

```text
ip_object_name/core.py                    管理する
ip_object_name/credentials.py             管理する
ip_object_name/local_settings.example.py  管理する（空のキー）
ip_object_name/local_settings.py          管理しない（実際のキー）
```

Gitから別のPCへcloneした場合は、空のテンプレートをコピーして、そのPC用のキーを記入します。

```bash
cp ip_object_name/local_settings.example.py ip_object_name/local_settings.py
chmod 600 ip_object_name/local_settings.py
nano ip_object_name/local_settings.py
```

この変更はキーの読み込みと移行についてテスト済みです。現在のWSLへの適用は上記のコマンドで行います。
移行後に`local_settings.py`をGitへ追加する必要はありません。
