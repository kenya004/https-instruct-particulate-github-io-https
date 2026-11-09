import * as THREE from "three";
import { createTurntableControls } from "./turntable_controls.js";
import { Streamlit } from "streamlit-component-lib";
import { createIcons, RotateCcw, Focus } from "lucide";
import { solveTranslations, transformedAnchor } from "./connection_solver.js";
import { normalizeEditorArgs } from "./editor_args.js";
import { affineTransforms, sampledAnchor, writeBlendedPositions } from "./boundary_blending.js";

const viewport = document.getElementById("viewport");
const sliderList = document.getElementById("sliders");
const errorBox = document.getElementById("error");
const MIN = 0.1;
const MAX = 3.0;
let sourceKey = null;
let sequence = 0;
let scales = {};
let offsets = {};
let movement = { limit: 1, step: 0.001 };
let dragging = false;
let dirty = true;
let cameraRadius = 0;
let sceneCenter = new THREE.Vector3();
let meshes = new Map();
let widgets = new Map();
let grid = null;
let partData = [];
let layout = { connections: [], attachments: [] };
let layoutKey = null;
let blending = { parts: {}, anchors: {} };
let blendingKey = null;
let following = false;
let showAnchors = false;
let anchorGeometry = null;
let anchorPoints = null;
let anchorLines = null;
let sceneExtent = 1;
let renderer, scene, camera, orbit, group;

createIcons({ icons: { RotateCcw, Focus } });

function showError(error) {
  console.error("Part editor render failed", error);
  errorBox.hidden = false;
  errorBox.textContent = `3D表示を開始できません：${error.message || error}`;
  Streamlit.setFrameHeight(document.getElementById("workspace").offsetHeight + 4);
}

try {
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0xf8fafb);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  viewport.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-label", "パーツ編集の3D表示");
  renderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    showError(new Error("WebGLの接続が失われました。画面を再読み込みしてください。"));
  });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, 1, 0.001, 10000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc4d0d6, 2.3));
  for (const [position, intensity] of [[[3, -4, 5], 2.8], [[-4, 2, 1], 1.2]]) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(...position);
    scene.add(light);
  }
  group = new THREE.Group();
  scene.add(group);
  camera.position.set(3, -4, 3);
} catch (error) {
  showError(error);
}

function fitView() {
  if (!renderer || !orbit || !meshes.size) return;
  group.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  const radius = Math.max(box.getSize(new THREE.Vector3()).length() / 2, 1e-8);
  const direction = camera.position.clone().sub(orbit.target).normalize();
  if (!direction.lengthSq()) direction.set(1, -1, 0.8).normalize();
  const halfFov = Math.min(camera.fov * Math.PI / 360, Math.atan(Math.tan(camera.fov * Math.PI / 360) * camera.aspect));
  const distance = radius / Math.sin(halfFov) * 1.25;
  camera.position.copy(center).addScaledVector(direction, distance);
  camera.near = radius / 1000;
  camera.far = radius * 1000;
  camera.updateProjectionMatrix();
  orbit.target.copy(center);
  orbit.minDistance = radius / 20;
  orbit.maxDistance = radius * 100;
  orbit.update();
  cameraRadius = radius;
  dirty = true;
}

function keepInFrame() {
  if (!renderer || !orbit || !meshes.size) return;
  group.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(group);
  const radius = bounds.getSize(new THREE.Vector3()).length() / 2;
  if (radius + bounds.getCenter(new THREE.Vector3()).distanceTo(orbit.target) > cameraRadius * 1.25) fitView();
}

function updatePreview() {
  const automatic = solveTranslations(partData, scales, following ? layout.attachments : []);
  const translations = Object.fromEntries(partData.map(part => {
    const id = String(part.part_id);
    return [id, automatic[id].map((value, axis) => value + offsets[id][axis])];
  }));
  const transforms = affineTransforms(partData, scales, automatic);
  const byId = new Map(partData.map(part => [part.part_id, part]));
  for (const part of partData) {
    const mesh = meshes.get(String(part.part_id));
    if (!mesh) continue;
    const id = String(part.part_id), spec = blending.parts[id];
    if (spec) {
      const positions = mesh.geometry.getAttribute("position");
      writeBlendedPositions(part, transforms, spec, positions.array);
      positions.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeBoundingBox();
      mesh.geometry.computeBoundingSphere();
      mesh.scale.setScalar(1);
      mesh.position.set(...part.center).add(new THREE.Vector3(...offsets[id])).sub(sceneCenter);
    } else {
      mesh.scale.setScalar(scales[id]);
      mesh.position.set(...part.center).add(new THREE.Vector3(...translations[id])).sub(sceneCenter);
    }
  }
  if (anchorGeometry) {
    const positions = anchorGeometry.getAttribute("position");
    const colors = anchorGeometry.getAttribute("color");
    for (const [index, connection] of layout.connections.entries()) {
      const samples = blending.anchors[String(connection.connection_id)];
      const ends = samples
        ? samples.map(sample => sampledAnchor(sample, byId, transforms, blending, offsets))
        : [connection.part_a, connection.part_b].map(id => transformedAnchor(byId.get(id), scales[String(id)], connection.anchor, translations[String(id)]));
      const distance = new THREE.Vector3(...ends[0]).distanceTo(new THREE.Vector3(...ends[1]));
      const color = new THREE.Color(distance <= sceneExtent * 1e-7 ? 0x087863 : 0xdb6032);
      for (let side = 0; side < 2; side += 1) {
        const point = new THREE.Vector3(...ends[side]).sub(sceneCenter);
        positions.setXYZ(index * 2 + side, point.x, point.y, point.z);
        colors.setXYZ(index * 2 + side, color.r, color.g, color.b);
      }
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    anchorGeometry.computeBoundingSphere();
    anchorPoints.visible = showAnchors;
    anchorLines.visible = showAnchors;
  }
  dirty = true;
  keepInFrame();
}

function updateScale(partId, value, redraw = true) {
  const id = String(partId);
  scales[id] = value;
  const widget = widgets.get(id);
  if (widget) {
    widget.input.value = String(value);
    widget.output.value = `${value.toFixed(2)}×`;
  }
  if (redraw) updatePreview();
}

function formatOffset(value) {
  return `${value > 0 ? "+" : ""}${Number(value.toPrecision(6))}`;
}

function updateOffset(partId, axis, value, redraw = true) {
  const id = String(partId);
  offsets[id][axis] = value;
  const widget = widgets.get(id);
  if (widget) {
    widget.moveInputs[axis].value = String(value);
    widget.moveOutputs[axis].value = formatOffset(value);
  }
  if (redraw) updatePreview();
}

function commit() {
  if (!sourceKey) return;
  dragging = false;
  sequence += 1;
  Streamlit.setComponentValue({ source_key: sourceKey, sequence, scales: { ...scales },
    offsets: Object.fromEntries(Object.entries(offsets).map(([id, value]) => [id, [...value]])) });
}

function rebuild(args) {
  sourceKey = args.source_key;
  sequence = Number(args.sequence) || 0;
  scales = { ...args.scales };
  offsets = Object.fromEntries(args.parts.map(part => [String(part.part_id), [...(args.offsets?.[String(part.part_id)] ?? [0, 0, 0])]]));
  movement = args.movement;
  partData = args.parts;
  layout = args.layout;
  layoutKey = args.layout_key;
  blending = args.blending;
  blendingKey = args.blending_key;
  following = args.follow;
  showAnchors = args.show_anchors;
  widgets.clear();
  sliderList.replaceChildren();
  for (const mesh of meshes.values()) {
    group?.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  meshes.clear();
  if (anchorGeometry) {
    scene.remove(anchorPoints, anchorLines);
    anchorGeometry.dispose();
    anchorPoints.material.dispose();
    anchorLines.material.dispose();
    anchorGeometry = anchorPoints = anchorLines = null;
  }
  if (grid) {
    scene.remove(grid);
    grid.geometry.dispose();
    grid.material.dispose();
    grid = null;
  }
  const bounds = new THREE.Box3();
  for (const part of args.parts) {
    for (const point of part.vertices) bounds.expandByPoint(new THREE.Vector3(...point));
  }
  sceneCenter = bounds.getCenter(new THREE.Vector3());
  const up = new THREE.Vector3();
  up[args.up_dir.slice(-1).toLowerCase()] = args.up_dir.startsWith("-") ? -1 : 1;
  if (camera) {
    camera.up.copy(up);
    const right = Math.abs(up.x) > 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const back = new THREE.Vector3().crossVectors(right, up).normalize();
    camera.position.copy(right).multiplyScalar(3).addScaledVector(back, 4).addScaledVector(up, 3);
    orbit?.dispose();
    orbit = createTurntableControls(camera, renderer.domElement, up);
    orbit.addEventListener("change", () => { dirty = true; });
  }
  for (const part of args.parts) {
    const id = String(part.part_id);
    const empty = !part.faces.length;
    const row = document.createElement("div");
    row.className = empty ? "part empty" : "part";
    row.dataset.partId = id;
    const heading = document.createElement("div");
    heading.className = "part-heading";
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.backgroundColor = part.color;
    const label = document.createElement("label");
    label.className = "part-name";
    label.textContent = part.name;
    label.htmlFor = `scale-${id}`;
    const output = document.createElement("output");
    output.htmlFor = `scale-${id}`;
    const input = document.createElement("input");
    input.type = "range";
    input.id = `scale-${id}`;
    input.min = String(MIN);
    input.max = String(MAX);
    input.step = "0.01";
    input.value = String(scales[id] ?? 1);
    input.disabled = empty;
    input.setAttribute("aria-label", part.name);
    input.addEventListener("pointerdown", () => { dragging = true; });
    input.addEventListener("input", () => updateScale(id, Number(input.value)));
    input.addEventListener("change", commit);
    input.addEventListener("pointercancel", () => { dragging = false; });
    heading.append(swatch, label, output);
    row.append(heading, input);
    if (empty) {
      const note = document.createElement("div");
      note.className = "empty-label";
      note.textContent = "面なし";
      row.appendChild(note);
    }
    const endpoints = document.createElement("div");
    endpoints.className = "endpoints";
    for (const text of ["0.10", "3.00"]) {
      const span = document.createElement("span");
      span.textContent = text;
      endpoints.appendChild(span);
    }
    row.appendChild(endpoints);
    const moveInputs = [], moveOutputs = [];
    for (const [axis, name] of ["X", "Y", "Z"].entries()) {
      const control = document.createElement("div");
      control.className = "translation";
      control.dataset.axis = name;
      const moveHeading = document.createElement("div");
      moveHeading.className = "translation-heading";
      const moveLabel = document.createElement("label");
      moveLabel.textContent = `${name} 移動`;
      moveLabel.htmlFor = `move-${id}-${name}`;
      const moveOutput = document.createElement("output");
      moveOutput.htmlFor = moveLabel.htmlFor;
      const moveInput = document.createElement("input");
      moveInput.type = "range";
      moveInput.id = moveLabel.htmlFor;
      moveInput.min = String(-movement.limit);
      moveInput.max = String(movement.limit);
      moveInput.step = String(movement.step);
      moveInput.disabled = empty;
      moveInput.setAttribute("aria-label", `${part.name} ${name}移動`);
      moveInput.addEventListener("pointerdown", () => { dragging = true; });
      moveInput.addEventListener("input", () => updateOffset(id, axis, Number(moveInput.value)));
      moveInput.addEventListener("change", commit);
      moveHeading.append(moveLabel, moveOutput);
      control.append(moveHeading, moveInput);
      row.appendChild(control);
      moveInputs.push(moveInput);
      moveOutputs.push(moveOutput);
    }
    sliderList.appendChild(row);
    widgets.set(id, { input, output, empty, moveInputs, moveOutputs });
    if (!empty && renderer) {
      const center = new THREE.Vector3(...part.center);
      const positions = new Float32Array(part.vertices.length * 3);
      part.vertices.forEach((point, index) => {
        positions[index * 3] = point[0] - center.x;
        positions[index * 3 + 1] = point[1] - center.y;
        positions[index * 3 + 2] = point[2] - center.z;
      });
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setIndex(part.faces);
      geometry.computeVertexNormals();
      const material = new THREE.MeshStandardMaterial({ color: part.color, metalness: 0.02, roughness: 0.8, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = part.name;
      mesh.position.copy(center).sub(sceneCenter);
      mesh.userData.partId = part.part_id;
      group.add(mesh);
      meshes.set(id, mesh);
    }
    updateScale(id, Number(scales[id] ?? 1), false);
    for (let axis = 0; axis < 3; axis += 1) updateOffset(id, axis, Number(offsets[id][axis]), false);
  }
  if (renderer) {
    const extent = Math.max(bounds.getSize(new THREE.Vector3()).length(), 1e-8);
    sceneExtent = extent;
    if (layout.connections.length) {
      anchorGeometry = new THREE.BufferGeometry();
      anchorGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(layout.connections.length * 6), 3));
      anchorGeometry.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(layout.connections.length * 6), 3));
      anchorPoints = new THREE.Points(anchorGeometry, new THREE.PointsMaterial({ size: 9, sizeAttenuation: false, vertexColors: true, depthTest: false, depthWrite: false }));
      anchorLines = new THREE.LineSegments(anchorGeometry, new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, depthWrite: false }));
      anchorPoints.renderOrder = 21;
      anchorLines.renderOrder = 20;
      scene.add(anchorPoints, anchorLines);
    }
    grid = new THREE.GridHelper(extent * 1.6, 12, 0xc5d3d8, 0xe4e9ec);
    grid.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
    let minimum = Infinity;
    for (const part of args.parts) {
      for (const point of part.vertices) minimum = Math.min(minimum, new THREE.Vector3(...point).sub(sceneCenter).dot(up));
    }
    grid.position.copy(up).multiplyScalar(minimum - extent * 0.015);
    scene.add(grid);
    updatePreview();
    resize();
    fitView();
  }
}

function resize() {
  if (renderer) {
    const width = Math.max(viewport.clientWidth, 1);
    const height = Math.max(viewport.clientHeight, 1);
    renderer.setSize(width, height, false);
    const aspectChanged = Math.abs(camera.aspect - width / height) > 0.01;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (aspectChanged && meshes.size) fitView();
    dirty = true;
  }
  Streamlit.setFrameHeight(document.getElementById("workspace").offsetHeight + 4);
}

document.getElementById("reset").addEventListener("click", () => {
  for (const id of widgets.keys()) {
    updateScale(id, 1, false);
    for (let axis = 0; axis < 3; axis += 1) updateOffset(id, axis, 0, false);
  }
  updatePreview();
  commit();
});
document.getElementById("fit").addEventListener("click", fitView);
window.addEventListener("pointerup", () => { dragging = false; });
window.addEventListener("pointercancel", () => { dragging = false; });
new ResizeObserver(resize).observe(document.getElementById("workspace"));

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, (event) => {
  try {
    const args = normalizeEditorArgs(event.detail?.args);
    if (args.source_key !== sourceKey || args.blending_key !== blendingKey) rebuild(args);
    else {
      const layoutChanged = layoutKey !== args.layout_key;
      layout = args.layout;
      layoutKey = args.layout_key;
      following = args.follow;
      showAnchors = args.show_anchors;
      blending = args.blending;
      if (!dragging && Number(args.sequence) >= sequence) {
        sequence = Number(args.sequence);
        for (const [id, value] of Object.entries(args.scales)) updateScale(id, Number(value), false);
        for (const [id, value] of Object.entries(args.offsets)) {
          for (let axis = 0; axis < 3; axis += 1) updateOffset(id, axis, Number(value[axis]), false);
        }
      }
      updatePreview();
      if (layoutChanged) fitView();
    }
    for (const widget of widgets.values()) {
      widget.input.disabled = widget.empty || Boolean(event.detail.disabled);
      for (const input of widget.moveInputs) input.disabled = widget.empty || Boolean(event.detail.disabled) || !args.supports_movement;
    }
    const compatibility = document.getElementById("compatibility");
    compatibility.hidden = args.supports_movement;
    compatibility.textContent = args.supports_movement ? "" : "移動機能の更新が反映されていません。Windows側のStreamlitを再起動し、画面を再読み込みしてください。";
    if (renderer && !renderer.getContext().isContextLost()) {
      errorBox.hidden = true;
      errorBox.textContent = "";
    }
    resize();
  } catch (error) {
    showError(error);
  }
});

function animate() {
  requestAnimationFrame(animate);
  if (!renderer) return;
  orbit?.update();
  if (dirty) {
    renderer.render(scene, camera);
    dirty = false;
  }
}
animate();
Streamlit.setComponentReady();
Streamlit.setFrameHeight(540);
