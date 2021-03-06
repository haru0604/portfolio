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
      // window.addEventListener(
      //   "keydown",
      //   (event) => {
      //     switch (event.key) {
      //       case "Escape":
      //         run = event.key !== "Escape";
      //         break;
      //       case " ":
      //         isDown = true;
      //         break;
      //       default:
      //     }
      //   },
      //   false
      // );
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

      // window.addEventListener(
      //   "mousemove",
      //   (event) => {
      //     const delay = 20;
      //     let x = event.clientX / window.innerWidth;
      //     let y = event.clientY / window.innerHeight;
      //     x = x * 2.0 - 1.0; // -1 ~ 1
      //     y = y * 2.0 - 1.0; // -1 ~ 1
      //     // x = x - 0.5;
      //     // y = y - 0.5;
      //     const mouseMoveCamera = new THREE.Vector2(x, y);
      //     // const nv = mouseMoveCamera.normalize(); // 単位化 normalized vector
      //     camera.position.x = mouseMoveCamera.x / 2; // カメラの移動する範囲を2分の1に
      //     camera.position.y = -mouseMoveCamera.y / 2;
      //     // camera.position.x += (x - camera.position.x) / delay;
      //     // camera.position.y += (-y - camera.position.y) / delay;
      //     camera.updateProjectionMatrix();
      //   },
      //   false
      // );

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

  const SCENE_PARAM = {
    fogColor: 0x000000, // フォグの色
    fogNear: 0, // フォグの掛かり始めるカメラからの距離
    fogFar: 15.0, // フォグが完全に掛かるカメラからの距離
  };

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
    scene.fog = new THREE.Fog(
      SCENE_PARAM.fogColor,
      SCENE_PARAM.fogNear,
      SCENE_PARAM.fogFar
    );

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

    const COUNT = 2000; // パーティクルの純粋な個数

    for (let i = 0; i <= COUNT; ++i) {
      // Math.random は 0 以上 1 未満の数値をランダムで返す
      // const x = (Math.random() - 0.5) * 2.0 * SIZE;
      // const y = (Math.random() - 0.5) * 2.0 * SIZE;
      // const z = (Math.random() - 0.5) * 2.0 * SIZE;
      const x = 0;
      const y = 0;
      const z = (Math.random() - 0.5) * 2.0 * LONG_SIZE;

      const point = new THREE.Vector3(x, y, z);

      point.velocityZ = Math.random();
      point.theta = 2 * Math.PI * Math.random();
      point.rotation = (Math.random() - 0.5) * 2.0;
      geometry.vertices.push(point);
      geometry.colors.push(new THREE.Color(Math.random() * 0x00ffff));
    }

    points = Points(geometry);
    // シーンにパーティクルを追加
    scene.add(points);

    // 軸ヘルパー
    // axesHelper = new THREE.AxesHelper(5.0);
    // scene.add(axesHelper);

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
      const nowTime = (Date.now() - startTime) / 1000;
      vertices.forEach(function (v) {
        v.z = v.z + v.velocityZ * 0.05;
        v.theta += v.rotation * 0.01;
        v.x = Math.cos(v.theta);
        v.y = Math.sin(v.theta);
        if (v.z >= LONG_SIZE) v.z = -LONG_SIZE;
      });

      points.geometry.verticesNeedUpdate = true;

      points.rotation.z = nowTime * 0.005;
      requestAnimationFrame(render);
    }
    renderer.render(scene, camera);
  }
})();
