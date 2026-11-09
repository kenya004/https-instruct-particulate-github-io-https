# 名前推定と同時に上方向を推定して接地する

Windows UIの「名前推定と同時に上方向を自動調整」は初期状態でオンです。
「パーツ構成を作成」を押すと、既存の4方向画像を使い、Geminiの1回の呼び出しで物体名と上方向を取得します。
画像ごとのカメラ基底をテキストで添え、共通の描画座標系で上方向を回答させます。
追加のBlender起動、候補画像の生成、VLMの再呼び出し、底面探索は行いません。

Pythonが上方向を＋Zへ向ける回転を計算し、その後で最下点をZ＝0へ平行移動します。
姿勢推定の指示では、識別できる持ち手が1つある場合、持ち手側を低いZ、主要な本体・作用部を高いZへ向けます。通常使用時の上下より、このルールを優先します。
持ち手がない場合は通常使用時の上下を使い、複数の持ち手などで方向を一意に決められない場合は推定不能として扱います。
これはVLMへの指示変更であり、モデルの再学習ではありません。持ち手の画像上の位置から決め打ちすることもありません。
接地後の最小Zは0なので、「持ち手側が低いZ」は負の座標へ移す意味ではありません。通常の置き方とは異なる姿勢になる場合があります。
拡大縮小やZ軸まわりの正面合わせは行いません。メッシュ構成、インスタンス、色・マテリアルと寸法を維持する剛体変換です。
VLMの推定誤差による底面の傾きは残り得ます。接地処理だけで底面を水平にはしません。
上方向が不明（`up_vector: null`）なら、UIで選択した方向を＋Zへ向けて接地し、その旨を表示します。

## WSL側の更新

起動中のAPI・フォルダ監視をCtrl+Cで停止して、WSLで以下を実行してください。
Windows側の編集内容はWSLへ自動反映されません。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate

bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
for file in core.py pose.py store.py workflow_api.py segmentation.py planning.py api.py __main__.py watch.py object-pose-system-prompt.md; do
  cp "$bundle/ip_object_name/$file" ip_object_name/
done

export IP_OBJECT_NAME_MODEL=gemini-3.8-flash
export IP_PART_PLANNER_MODEL=gemini-3.8-flash
export BLENDER_BIN=/usr/bin/blender

python -m uvicorn ip_object_name.workflow_api:app \
  --host 127.0.0.1 --port 8004 --workers 1
```

APIキーを保存している `local_settings.py` と `credentials.py` はコピーしません。追加のPython依存はありません。
WindowsのStreamlit画面を再読み込みし、新しくGLBを登録してください。
推定前のプレビューは選択した初期上方向、推定後は回転・接地後のモデルです。
入力プレビュー・分割・編集・結合で同じ処理用座標を使い、初期上方向を重ねて適用しません。
自動調整をオフにすると、従来どおり指定した上方向で処理し、自動接地は行いません。

## 保存内容とAPI

```text
data/models/<model_id>/
  input.glb       元のGLB。上書きしない
  oriented.glb    回転・接地後の処理用GLB
  metadata.json
  recognition/<run_id>/
    renders/      既存の画像とカメラ情報
    request.json
    system_prompt.md
    object_name.json
```

`POST /models` に `auto_orient=true` を追加します。Windows UIからは初期状態で送信します。
既存クライアントとの互換性のため、APIで省略した場合はオフです。
`GET /health` の `features.auto_orientation` が `true` なら対応版です。
完了したモデルへの再呼び出しでは推定を繰り返しません。既存モデルへ遡って姿勢を適用しません。

- `original_input_mesh` / `source_sha256`：元GLBとそのハッシュ。
- `input_mesh` / `input_sha256`：分割に渡す処理用GLBとそのハッシュ。自動調整時は `oriented.glb`。
- `source_up_dir`：最初の画像生成に使った上方向。
- `up_dir`：処理用GLBの上方向。調整後は `+Z`。
- `orientation.source_to_aligned` / `aligned_to_source`：入力シーン座標→処理用座標の4×4行列と逆行列。
- `orientation.up_vector_render` / `up_vector_source`：推定方向の描画座標・入力座標表現。
- `orientation.status`：`estimated` または `manual_fallback`。

入力プレビューは元GLBに記録済みの行列を1回だけ適用し、処理用GLBの追加ダウンロードはしません。
分割は処理用GLBを読み、編集NPZもその座標を持ちます。ファイル整合性は処理用ハッシュで検査します。

CLIで試す場合：

```bash
python -m ip_object_name --mesh /path/to/model.glb --auto-orient --up-dir=+Z
```

フォルダ監視では `--auto-orient` または `IP_OBJECT_NAME_AUTO_ORIENT=true` を指定すると、新規入力に同じ処理を適用します。
`--render-only` は画像生成だけを行い、姿勢推定と回転は行いません。
