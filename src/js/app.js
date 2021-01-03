"use strict";
import * as THREE from "three";
import { Points } from "./Points";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BufferGeometryLoader } from "three";
(() => {
  window.addEventListener(
    "DOMContentLoaded",
    () => {
      // キーダウンイベントの定義
      window.addEventListener(
        "keydown",
        (event) => {
          switch (event.key) {
            case "Escape":
              run = event.key !== "Escape";
              break;
            case " ":
              isDown = true;
              break;
            default:
          }
        },
        false
      );
      window.addEventListener(
        "keyup",
        (event) => {
          isDown = false;
        },
        false
      );

      // リサイズイベントの定義
      window.addEventListener(
        "resize",
        () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        },
        false
      );

      // 初期化処理
      init();
    },
    false
  );

  // 汎用変数
  let run = true; // レンダリングループフラグ
  let isDown = false; // スペースキーが押されているかどうかのフラグ
  let startTime = 0;

  // three.js に関連するオブジェクト用の変数
  let scene; // シーン
  let camera; // カメラ
  let renderer; // レンダラ
  let geometry; // ジオメトリ
  let materialPoint; // マテリアル
  let points; // パーティクル
  let controls; // カメラコントロール
  let axesHelper; // 軸ヘルパーメッシュ
  let texture;
  const SIZE = 1.0; // どの程度の範囲に配置するかのサイズ
  const LONG_SIZE = SIZE * 10.0;

  // カメラに関するパラメータ
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 100.0,
    x: 0.0,
    y: 0.0,
    z: 10.0,
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };
  // レンダラに関するパラメータ
  const RENDERER_PARAM = {
    clearColor: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  function init() {
    // シーン
    scene = new THREE.Scene();

    // レンダラ
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
    renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(renderer.domElement);

    // カメラ
    camera = new THREE.PerspectiveCamera(
      CAMERA_PARAM.fovy,
      CAMERA_PARAM.aspect,
      CAMERA_PARAM.near,
      CAMERA_PARAM.far
    );
    camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
    camera.lookAt(CAMERA_PARAM.lookAt);

    // materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);
    // materialPoint.map = knot;

    // パーティクルの定義 @@@
    geometry = new THREE.Geometry(); // 特定の形状を持たない素体ジオメトリ

    const COUNT = 1000; // パーティクルの純粋な個数

    for (let i = 0; i <= COUNT; ++i) {
      // Math.random は 0 以上 1 未満の数値をランダムで返す
      // const x = (Math.random() - 0.5) * 2.0 * SIZE;
      // const y = (Math.random() - 0.5) * 2.0 * SIZE;
      // const z = (Math.random() - 0.5) * 2.0 * SIZE;
      const theta = 2.0 * Math.PI * Math.random();
      const x = Math.cos(theta) * (SIZE + Math.random() * 3);
      const y = Math.sin(theta) * (SIZE + Math.random() * 3);
      const z = (Math.random() - 0.5) * 2.0 * LONG_SIZE;

      const point = new THREE.Vector3(x, y, z);
      point.velocityZ = Math.random();
      geometry.vertices.push(point);
      geometry.colors.push(new THREE.Color(Math.random() * 0x00ffff));
    }

    points = Points(geometry);
    // シーンにパーティクルを追加
    scene.add(points);

    // 軸ヘルパー
    axesHelper = new THREE.AxesHelper(5.0);
    scene.add(axesHelper);

    // コントロール
    controls = new OrbitControls(camera, renderer.domElement);

    // すべての初期化が完了したら描画を開始する
    run = true;
    startTime = Date.now();
    render();
  }

  function render() {
    // 再帰呼び出し
    if (run === true) {
      var vertices = points.geometry.vertices;
      vertices.forEach(function (v) {
        v.z = v.z + v.velocityZ * 0.05;

        if (v.z >= LONG_SIZE) v.z = -LONG_SIZE;
      });
      const nowTime = (Date.now() - startTime) / 1000;
      points.geometry.verticesNeedUpdate = true;

      points.rotation.z = nowTime * 0.05;
      requestAnimationFrame(render);
    }
    renderer.render(scene, camera);
  }
})();
