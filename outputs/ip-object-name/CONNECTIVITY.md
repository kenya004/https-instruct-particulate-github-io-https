# セグメント時の連結性強制

既存の「パーツごとの連結性を強制」がONの場合、Instruct-Particulateの面ラベル生成直後に、共有Edgeによる連結補正を実行します。CCSに入る前の分割処理の変更です。

2辺共有の境界補正は分割から独立したボタンです。「補正の順序」でCCSの前または後に適用できます。操作・保存・APIの詳細は[BOUNDARY_POSTPROCESSING.md](BOUNDARY_POSTPROCESSING.md)を参照してください。

## 処理

1. 上流の`decode_face_part_ids`で従来どおり面ラベルを作ります。ただし上流の距離グラフによる連結強制はOFFにし、独自の連結強制へ置き換えます。`strict_face_postprocess`は従来の設定を引き継ぎます。
2. 判定用に座標が完全一致する頂点へ共通IDを与え、両端が一致するEdgeを共有Edgeとします。元の頂点・Face配列は保持します。同じパーツの面をこのEdge接続で連結成分に分け、面積が最大の成分を本体として保持します。同面積の場合は面積加重した推論確率、それも同じ場合は成分の順序で決めます。
3. その他の成分を飛び地の候補とします。本体へ共有Edgeで接続できる候補から、成分全体を一括して割り当てます。各候補のスコアは、面内の推論点の確率を平均し、さらにFace面積で加重平均したものです。スコアが同じなら共有境界長、成分・パーツIDの順で決めます。
4. 取り込んだ成分も本体から連結しているため、その先へ順に領域を伸ばします。各成分は一度だけ確定し、本体を削除しません。面数や点数が多いだけで優先されないようにします。
5. どの本体へもEdgeの経路がない成分は、元の所属を保持し、未解消として記録・警告します。
6. この時点のラベルからGLB・NPZを出力し、「分割直後」として保存します。2辺共有の境界補正はまだ実行しません。

判定はEdge両端の座標の完全一致を基準にします。UV・法線の境界などで別IDの頂点が作られていても、同位置の両端を持つEdgeは接続として扱います。端点の順序は問いません。頂点1個だけの共有、近接、交差は接続とは扱いません。丸めや距離しきい値は使わないため、端点が微小にずれていれば一致とは判定しません。同じEdgeへ3枚以上のFaceが接する場合も共有Edgeとして判定しますが、その形状を修復する機能ではありません。

全Faceの所属と既存パーツIDを維持します。もともと空のパーツを埋めるために、離れた成分を強制的に割り当てる処理は行いません。頂点・Faceの追加、削除、溶接、移動も行いません。

モデルが本当に離れた複数のMeshからなる場合や、継ぎ目の端点が一致しない場合は、一つのパーツが複数成分のまま残ることがあります。ラベル変更だけでは物理的な接続を作れません。形状の配列を溶接しないため、判定上つながっていても元の頂点ID基準では複数成分のままです。1パーツだけの入力もGPU推論を省略したまま診断し、独立領域があれば報告します。

CCSのアルゴリズムは変更していません。CCSを後から実行すると所属変更で再び飛び地ができる可能性があります。分割時の連結性強制はCCS後に再実行しませんが、2辺共有の境界補正はCCSの前・後を選べます。

## 境界Faceの2辺共有補正

「2辺共有の境界補正を実行」ボタンで、選んだ順序に従って分割直後またはCCS後のNPZを使いCPU上で実行します。分割時には自動適用しません。

各Faceについて、同じパーツのFace群と共有する異なるEdgeの本数を数えます。三角形のパーツ境界を整えるため、他パーツに接していて、同じパーツとの共有Edgeが2本未満のFaceを候補とします。元メッシュの開口部だけに接するFaceはパーツ境界の補正対象に含めません。

Faceを移す条件は次のすべてです。

1. 移動先と2本以上の異なるEdgeを共有する。1本のEdgeに複数のFaceが接していても、Edgeを2本共有したとは数えない。
2. 移動元に最低1面を残す。
3. 当該FaceのEdgeに3面以上が接する非多様体の箇所ではない。

パーツ面積による移動方向や優先順位は使いません。大きい側から小さい側、小さい側から大きい側のどちらにも移動できます。各時点で、移動による境界Edgeの総本数の減少量が最大のFaceを選び、同点なら境界長の減少量が最大のFaceを選びます。そこまで同点なら元メッシュ内のFace番号の小さい順、最後に移動先パーツID順で決めます。長さは入力モデルの座標系による値です。

1面ずつ確定して周囲の候補と優先度を再計算します。古い優先度のキュー項目は無効化し、常に現在のラベルに基づいて次のFaceを選びます。移動先との共有Edge数を`b`、移動元との共有Edge数を`a`とすると、境界Edgeの総本数は各移動で`b-a >= 1`本減ります。総本数は0以上なので、全体の状態を繰り返す無限ループはありません。周囲の所属変更で同じFaceが後から元のパーツへ戻る可能性自体はあります。

幾何的な改善量まで同点の場合はFace番号が効くため、順序依存は残ります。診断には、選択時に同じ優先度の候補が複数あった回数と、先頭100回の移動を記録します。競合があったことだけで、そのモデルの最終結果が必ず変わると判定するものではありません。

移動候補のFaceは同じパーツにつながる辺が最大1本で、非多様体の箇所を除くため、同じパーツの隣接Faceも最大1面です。そのFaceを外しても残りのパーツは分断されません。移動先にも共有Edgeで接続します。処理終了時にも、非空パーツが消失していないことと、連結成分数が増えていないことを検証します。

面積による方向の偏りを外したため、小さいパーツが縮むこともあります。細いパーツや3パーツの境界など、条件を両立できない箇所はFaceを保持し、未解消の件数・理由を記録してUIへ警告します。すべてのFaceが2辺共有を満たす保証や、境界の滑らかさ・平面性の保証はありません。境界の蓋や新しい切断Faceは生成しません。

## 診断

`parts.json`の`diagnostics.connectivity`に以下を記録します。

- `method`: `shared_edge_connectivity_v4`
- `parts`: 各パーツの`components_before`、`components_after`は重複頂点を考慮した連結成分数。`vertex_id_components_before`、`vertex_id_components_after`は元の頂点ID基準での成分数。いずれも同じ補正前後のFaceラベルを用いて数えます。保持した本体の面積も記録します。
- `source_vertex_count`、`topology_vertex_count`、`duplicate_vertex_count`: 元の頂点数、座標一致を考慮した判定用頂点数、同一視した重複頂点数
- `mesh_components_by_vertex_id`、`mesh_components_by_coincident_edges`: パーツのラベルに関係なく、入力メッシュ全体が何成分に分かれているかを2種類の基準で記録
- `changed_faces`、`changed_surface_area`、`total_surface_area`: 変更量。面積は入力メッシュの座標スケールによる値です。
- `all_nonempty_parts_connected`: 重複頂点を考慮したEdge接続で、非空パーツがすべて一成分か。`all_nonempty_parts_connected_by_vertex_id`には元ID基準の結果も記録
- `unresolved_components`: 未解消の成分の所属・面数・面積・理由
- `nonmanifold_edges`: 3枚以上のFaceが接するEdge数

2辺共有補正の結果では、`postprocessing`と`diagnostics.boundary`に次の診断を記録します。`method`は`two_internal_edges_boundary_gain_v2`です。

- `priority`、`tie_break`: 境界Edge数・境界長の減少量による優先順位と、同点時の規則
- `boundary_edges_before`、`boundary_edges_after`、`boundary_edge_reduction`: 境界Edgeの総本数の前後と減少量。同じ境界Edgeを両側のFaceで二重に数えない
- `boundary_length_before`、`boundary_length_after`、`boundary_length_reduction`: 境界Edgeの合計長さの前後と減少量
- `priority_tie_steps`、`max_equal_priority_candidates`、`order_dependence_possible`: 同点候補が競合した選択の回数・選択時の最大同点候補数・順序依存が残ること
- `move_sample`、`move_sample_limit`、`move_sample_truncated`: 先頭100回までの移動Face・移動元と先・その時点の本数と長さの減少量、記録上限と省略の有無
- `changed_faces`、`changed_surface_area`: 境界補正で所属が変わったFace数と面積
- `assignments`、`transfer_surface_area`、`transfers`: 移動の回数・延べ面積・移動元と先。同じFaceが周囲の変更に伴って複数回移ることがあります。
- `parts`: パーツごとの境界Face数・2辺共有を満たさない境界Face数・面数・連結成分数の補正前後
- `unresolved_boundary_faces`、`unresolved_face_indices`: 未解消の境界Face数と全体メッシュ内の面番号
- `unresolved_reasons`: `no_recipient_with_two_shared_edges`（2辺を共有する移動先がない）、`would_empty_part`（パーツ消失を回避）、`nonmanifold_edge`（非多様体Edge）ごとの件数

警告に表示する残存成分数には、重複頂点を考慮した`components_after`を使います。元の頂点IDが異なるだけでは警告を出しません。
`diagnostics.connectivity.parts`と`unresolved_components`は分割直後のラベルの記録です。2辺共有補正後の連結成分数は`postprocessing.parts`に記録します。

`diagnostics.connectivity`は分割時、`diagnostics.boundary`は2辺共有補正時、`diagnostics.ccs`はCCS時の記録です。どの記録が最終段階かは、結果の`method`と`processing_order`で確認できます。CCS側は元の頂点IDによるEdge共有を基準にしており、今回の補正とは判定基準が異なります。

NPZ・GLBの形式は従来どおりで、補正後の所属を使用して出力します。「パーツごとの連結性を強制」をOFFにすると今回の連結補正を省略します。

## WSLへの最小更新

WSLで起動中の8004番のAPIを`Ctrl+C`で停止して、次を実行します。

```bash
cd ~/git/instruct-particulate
source .venv/bin/activate
bundle='/mnt/c/Users/mrkab/Documents/Codex/2026-09-26/https-instruct-particulate-github-io-https/outputs/ip-object-name'
cp "$bundle/ip_object_name/connectivity.py" ip_object_name/
cp "$bundle/ip_object_name/segmentation.py" ip_object_name/
cp "$bundle/ip_object_name/boundary_postprocessing.py" ip_object_name/
cp "$bundle/ip_object_name/ccs_postprocessing.py" ip_object_name/
cp "$bundle/ip_object_name/workflow_api.py" ip_object_name/
python -m uvicorn ip_object_name.workflow_api:app --host 127.0.0.1 --port 8004 --workers 1
```

現在使用中のWSLターミナルのモデル・Blenderの環境変数を引き継ぎます。新しいターミナルでは[SEGMENTATION.md](SEGMENTATION.md)の起動設定を使用してください。APIキー設定のコピーは不要です。

追加パッケージは不要です。Windows側の更新済みStreamlitを再読み込みしてください。更新されなければ同じ`app.py`のサーバーを再起動します。旧版で自動境界補正された結果を使っている場合は、一度「再分割」を実行し、補正前の結果を作ってください。

再分割後、UIの「対応表 JSON」をダウンロードし、`diagnostics.connectivity.method`が`shared_edge_connectivity_v4`であることを確認できます。`parts`内の`handle`に対応する`part_id`について、`vertex_id_components_after`と`components_after`を比較してください。実モデルの427成分がどこまで解消したかは、この新しい分割結果で確認します。ボタン実行後の2辺共有の補正量・残件は、その結果の`postprocessing`で確認します。

## 検証

共有Edgeに接した飛び地の再割り当て、面積による本体選択、面積加重確率、点数変更に対する同じ判定、同位置の重複Edge・逆順の端点の認識、頂点のみの接触・近接・微小な隙間の除外、頂点重複の保持、非多様体Edge、到達できない成分の報告、全Face・IDの維持を人工メッシュで検証しています。全Faceの頂点を複製した427面の入力で、元ID基準427成分、重複頂点考慮後1成分となる例も含みます。これは人工例であり、ユーザーの実モデルで427成分が解消したという検証ではありません。GLB・NPZ出力にも元の頂点・Face配列が保持されることを検証します。GPUモデルの推論品質は実際の入力モデルで確認してください。

2辺共有補正は、境界の突起の移動、面積に依存しない双方向の移動、本数を長さより優先すること、長さをFace番号より優先すること、隣接Faceの優先度の更新、最後の面の保持、3パーツの境界、非多様体Edge、頂点を複製したメッシュへの適用、診断・警告のAPI保存を検証します。同点の人工メッシュでFace順によって結果が変わる例と、改善量が一意ならFace順を変えても同じ結果になる例を含みます。
