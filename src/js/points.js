import * as THREE from "three";

function generateSprite() {
  var canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  var context = canvas.getContext("2d");
  var gradient = context.createRadialGradient(
    // 中の円と外の円の大きさと半径の長さを設定する
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  // gradient.addColorStop(0, "rgba(255,255,255,1)");
  // gradient.addColorStop(0.2, "rgba(0,255,255,1)");
  // gradient.addColorStop(0.4, "rgba(0,0,64,1)");
  // gradient.addColorStop(1, "rgba(0,0,0,1)");
  // gradient.addColorStop(0, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// メッシュを作成
function Points(geom) {
  var material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    map: generateSprite(), //テクスチャ
    depthWrite: false,
  });
  var cloud = new THREE.Points(geom, material);
  cloud.sortParticles = true;
  return cloud;
}

export { Points };
