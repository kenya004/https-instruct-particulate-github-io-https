# セグメント時の連結性強制

既存の「パーツごとの連結性を強制」がONの場合、Instruct-Particulateの面ラベル生成直後に、共有Edgeによる連結補正を実行します。CCSに入る前の分割処理の変更です。

## 処理

1. 上流の`decode_face_part_ids`で従来どおり面ラベルを作ります。ただし上流の距離グラフによる連結強制はOFFにし、独自の連結強制へ置き換えます。`strict_face_postprocess`は従来の設定を引き継ぎます。
2. 判定用に座標が完全一致する頂点へ共通IDを与え、両端が一致するEdgeを共有Edgeとします。元の頂点・Face配列は保持します。同じパーツの面をこのEdge接続で連結成分に分け、面積が最大の成分を本体として保持します。同面積の場合は面積加重した推論確率、それも同じ場合は成分の順序で決めます。
3. その他の成分を飛び地の候補とします。本体へ共有Edgeで接続できる候補から、成分全体を一括して割り当てます。各候補のスコアは、面内の推論点の確率を平均し、さらにFace面積で加重平均したものです。スコアが同じなら共有境界長、成分・パーツIDの順で決めます。
4. 取り込んだ成分も本体から連結しているため、その先へ順に領域を伸ばします。各成分は一度だけ確定し、本体を削除しません。面数や点数が多いだけで優先されないようにします。
5. どの本体へもEdgeの経路がない成分は、元の所属を保持し、未解消として記録・警告します。

判定はEdge両端の座標の完全一致を基準にします。UV・法線の境界などで別IDの頂点が作られていても、同位置の両端を持つEdgeは接続として扱います。端点の順序は問いません。頂点1個だけの共有、近接、交差は接続とは扱いません。丸めや距離しきい値は使わないため、端点が微小にずれていれば一致とは判定しません。同じEdgeへ3枚以上のFaceが接する場合も共有Edgeとして判定しますが、その形状を修復する機能ではありません。

全Faceの所属と既存パーツIDを維持します。もともと空のパーツを埋めるために、離れた成分を強制的に割り当てる処理は行いません。頂点・Faceの追加、削除、溶接、移動も行いません。

モデルが本当に離れた複数のMeshからなる場合や、継ぎ目の端点が一致しない場合は、一つのパーツが複数成分のまま残ることがあります。ラベル変更だけでは物理的な接続を作れません。形状の配列を溶接しないため、判定上つながっていても元の頂点ID基準では複数成分のままです。1パーツだけの入力もGPU推論を省略したまま診断し、独立領域があれば報告します。

CCSの処理は変更していません。CCSを後から実行すると所属変更で再び飛び地ができる可能性があり、今回の連結補正はCCS後には実行しません。

## 診断

`parts.json`の`diagnostics.connectivity`に以下を記録します。

- `method`: `shared_edge_connectivity_v2`
- `parts`: 各パーツの`components_before`、`components_after`は重複頂点を考慮した連結成分数。`vertex_id_components_before`、`vertex_id_components_after`は元の頂点ID基準での成分数。いずれも同じ補正前後のFaceラベルを用いて数えます。保持した本体の面積も記録します。
- `source_vertex_count`、`topology_vertex_count`、`duplicate_vertex_count`: 元の頂点数、座標一致を考慮した判定用頂点数、同一視した重複頂点数
- `mesh_components_by_vertex_id`、`mesh_components_by_coincident_edges`: パーツのラベルに関係なく、入力メッシュ全体が何成分に分かれているかを2種類の基準で記録
- `changed_faces`、`changed_surface_area`、`total_surface_area`: 変更量。面積は入力メッシュの座標スケールによる値です。
- `all_nonempty_parts_connected`: 重複頂点を考慮したEdge接続で、非空パーツがすべて一成分か。`all_nonempty_parts_connected_by_vertex_id`には元ID基準の結果も記録
- `unresolved_components`: 未解消の成分の所属・面数・面積・理由
- `nonmanifold_edges`: 3枚以上のFaceが接するEdge数

警告に表示する残存成分数には、重複頂点を考慮した`components_after`を使います。元の頂点IDが異なるだけでは警告を出しません。

CCS結果へ引き継がれた`diagnostics.connectivity`はCCS前の記録です。CCS後の連結成分数は従来の`diagnostics.ccs.parts`に記録されます。CCS側は元の頂点IDによるEdge共有を基準にしており、今回の補正とは判定基準が異なります。

NPZ・GLBの形式は従来どおりで、補正後の所属を使用して出力します。「パーツごとの連結性を強制」をOFFにすると今回の連結補正を省略します。

## WSLへの最小更新

WSLで起動中の8004番のAPIを`Ctrl+C`で停止して、次を実行します。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/connectivity.py" ip_object_name/
cp "$bundle/ip_object_name/segmentation.py" ip_object_name/
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
```

現在使用中のWSLターミナルのモデル・Blenderの環境変数を引き継ぎます。新しいターミナルでは[SEGMENTATION.md](SEGMENTATION.md)の起動設定を使用してください。APIキー設定のコピーは不要です。

Windows側のUI更新や追加パッケージは不要です。UIで連結強制をONにして「再分割」を実行してください。保存済みの分割結果には自動適用しません。

再分割後、UIの「対応表 JSON」をダウンロードし、`diagnostics.connectivity.method`が`shared_edge_connectivity_v2`であることを確認できます。`parts`内の`handle`に対応する`part_id`について、`vertex_id_components_after`と`components_after`を比較してください。実モデルの427成分がどこまで解消したかは、この新しい分割結果で確認します。

## 検証

共有Edgeに接した飛び地の再割り当て、面積による本体選択、面積加重確率、点数変更に対する同じ判定、同位置の重複Edge・逆順の端点の認識、頂点のみの接触・近接・微小な隙間の除外、頂点重複の保持、非多様体Edge、到達できない成分の報告、全Face・IDの維持を人工メッシュで検証しています。全Faceの頂点を複製した427面の入力で、元ID基準427成分、重複頂点考慮後1成分となる例も含みます。これは人工例であり、ユーザーの実モデルで427成分が解消したという検証ではありません。GLB・NPZ出力にも元の頂点・Face配列が保持されることを検証します。GPUモデルの推論品質は実際の入力モデルで確認してください。
