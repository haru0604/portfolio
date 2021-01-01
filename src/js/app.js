"use strict";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

  // three.js に関連するオブジェクト用の変数
  let scene; // シーン
  let camera; // カメラ
  let renderer; // レンダラ
  let geometry; // ジオメトリ
  let materialPoint; // マテリアル
  let points; // パーティクル
  let controls; // カメラコントロール
  let axesHelper; // 軸ヘルパーメッシュ

  // カメラに関するパラメータ
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 100.0,
    x: 0.0,
    y: 0.0,
    z: 20.0,
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };
  // レンダラに関するパラメータ
  const RENDERER_PARAM = {
    clearColor: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const MATERIAL_PARAM_POINT = {
    color: 0xff9933, // 頂点の色
    size: 0.1, // 頂点の基本となるサイズ
    sizeAttenuation: true, // 遠近感を出すかどうかの真偽値
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

    materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);

    // - パーティクルを定義する -------------------------------------------
    // サンプル 016 のときは、ループ構造を使って点が規則正しく整列するように
    // していましたが、ここでは乱数を使ってバラバラに頂点を配置しています。
    // このようなランダムな頂点の配置は手軽な割に、見た目が非常に美しくなる
    // ので、これをベースにオリジナルの工夫を凝らしてみるのもいいかもしれま
    // せん。
    // --------------------------------------------------------------------
    // パーティクルの定義 @@@
    geometry = new THREE.Geometry(); // 特定の形状を持たない素体ジオメトリ
    const COUNT = 10000; // パーティクルの純粋な個数
    const SIZE = 20.0; // どの程度の範囲に配置するかのサイズ
    for (let i = 0; i <= COUNT; ++i) {
      // Math.random は 0 以上 1 未満の数値をランダムで返す
      // const x = (Math.random() - 0.5) * 2.0 * SIZE;
      // const y = (Math.random() - 0.5) * 2.0 * SIZE;
      // const z = (Math.random() - 0.5) * 2.0 * SIZE;
      const theta = 2.0 * Math.PI * Math.random();
      const x = Math.cos(theta) * SIZE;
      const y = Math.sin(theta) * SIZE;
      const z = (Math.random() - 0.5) * 2.0 * SIZE;

      const point = new THREE.Vector3(x, y, z);
      point.velocityZ = Math.random();
      geometry.vertices.push(point);
    }
    // . 余談（JavaScript の Math.random） ................................
    // JavaScript では Math.random を使って乱数を得ることができます。
    // このとき得られるランダムな値は 0.0 以上 ～ 1.0 未満になります。
    // JavaScript の元になっている ECMAScript の言語仕様上は、Math.random の
    // 「戻り値の範囲」については記載がありますが、どのように乱数を生成する
    // のか（アルゴリズム）については言及がありません。
    // 2020 年現在、主要なウェブブラウザは XorShift を使っているようです。
    // 注意しなければならないのは、モバイルブラウザなど、メジャーブラウザで
    // はない実装上では乱数生成のアルゴリズムや精度が異なる可能性があること
    // です。
    // 乱数は、結構奥が深いジャンルです。コンピューターサイエンスにある程度
    // 習熟していないと正しく理解することは難しいと言えます。深淵を覗いてみ
    // たい好奇心旺盛な方には以下のサイトなどが参考になると思います。
    // http://www001.upp.so-net.ne.jp/isaku/rand.html
    // ....................................................................

    // パーティクルを格納したジオメトリとマテリアルからポイントオブジェクトを生成
    points = new THREE.Points(geometry, materialPoint);
    // シーンにパーティクルを追加
    scene.add(points);

    // 軸ヘルパー
    axesHelper = new THREE.AxesHelper(5.0);
    scene.add(axesHelper);

    // コントロール
    controls = new OrbitControls(camera, renderer.domElement);

    // すべての初期化が完了したら描画を開始する
    run = true;
    render();
  }

  function render() {
    // 再帰呼び出し
    if (run === true) {
      var vertices = points.geometry.vertices;
      vertices.forEach(function (v) {
        v.z = v.z + v.velocityZ * 0.1;

        if (v.z >= 20) v.z = -20;
      });
      points.geometry.verticesNeedUpdate = true;
      requestAnimationFrame(render);
    }
    renderer.render(scene, camera);
  }
})();
