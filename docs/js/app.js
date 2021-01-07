/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"js/app.js": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/app.js","/js/vendor.js"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Points.js":
/*!**************************!*\
  !*** ./src/js/Points.js ***!
  \**************************/
/*! exports provided: Points */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Points", function() { return Points; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


function generateSprite() {
  var canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  var context = canvas.getContext("2d");
  var gradient = context.createRadialGradient( // 中の円と外の円の大きさと半径の長さを設定する
  canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2); // gradient.addColorStop(0, "rgba(255,255,255,1)");
  // gradient.addColorStop(0.2, "rgba(0,255,255,1)");
  // gradient.addColorStop(0.4, "rgba(0,0,64,1)");
  // gradient.addColorStop(1, "rgba(0,0,0,1)");
  // gradient.addColorStop(0, "rgba(255,255,255,0.8)");

  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,1)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  var texture = new three__WEBPACK_IMPORTED_MODULE_0__["Texture"](canvas);
  texture.needsUpdate = true;
  return texture;
} // メッシュを作成


function Points(geom) {
  var material = new three__WEBPACK_IMPORTED_MODULE_0__["PointsMaterial"]({
    color: 0xffffff,
    size: 0.08,
    vertexColors: true,
    transparent: true,
    blending: three__WEBPACK_IMPORTED_MODULE_0__["AdditiveBlending"],
    map: generateSprite(),
    //テクスチャ
    depthWrite: false
  });
  var cloud = new three__WEBPACK_IMPORTED_MODULE_0__["Points"](geom, material);
  cloud.sortParticles = true;
  return cloud;
}



/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Points__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Points */ "./src/js/Points.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");








(function () {
  window.addEventListener("DOMContentLoaded", function () {
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
    window.addEventListener("keyup", function (event) {
      isDown = false;
    }, false); // リサイズイベントの定義

    window.addEventListener("resize", function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }, false); // window.addEventListener(
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
  }, false); // 汎用変数

  var run = true; // レンダリングループフラグ

  var isDown = false; // スペースキーが押されているかどうかのフラグ

  var startTime = 0; // three.js に関連するオブジェクト用の変数

  var scene; // シーン

  var camera; // カメラ

  var renderer; // レンダラ

  var geometry; // ジオメトリ

  var materialPoint; // マテリアル

  var points; // パーティクル

  var controls; // カメラコントロール

  var axesHelper; // 軸ヘルパーメッシュ

  var texture;
  var SIZE = 1.0; // どの程度の範囲に配置するかのサイズ

  var LONG_SIZE = SIZE * 10.0;
  var SCENE_PARAM = {
    fogColor: 0x000000,
    // フォグの色
    fogNear: 0,
    // フォグの掛かり始めるカメラからの距離
    fogFar: 15.0 // フォグが完全に掛かるカメラからの距離

  }; // カメラに関するパラメータ

  var CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 100.0,
    x: 0.0,
    y: 0.0,
    z: 10.0,
    lookAt: new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0.0, 0.0, 0.0)
  }; // レンダラに関するパラメータ

  var RENDERER_PARAM = {
    clearColor: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };

  function init() {
    // シーン
    scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
    scene.fog = new three__WEBPACK_IMPORTED_MODULE_1__["Fog"](SCENE_PARAM.fogColor, SCENE_PARAM.fogNear, SCENE_PARAM.fogFar); // レンダラ

    renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]();
    renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__["Color"](RENDERER_PARAM.clearColor));
    renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
    var wrapper = document.querySelector("#webgl");
    wrapper.appendChild(renderer.domElement); // カメラ

    camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](CAMERA_PARAM.fovy, CAMERA_PARAM.aspect, CAMERA_PARAM.near, CAMERA_PARAM.far);
    camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
    camera.lookAt(CAMERA_PARAM.lookAt); // materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);
    // materialPoint.map = knot;
    // パーティクルの定義 @@@

    geometry = new three__WEBPACK_IMPORTED_MODULE_1__["Geometry"](); // 特定の形状を持たない素体ジオメトリ

    var COUNT = 2000; // パーティクルの純粋な個数

    for (var i = 0; i <= COUNT; ++i) {
      // Math.random は 0 以上 1 未満の数値をランダムで返す
      // const x = (Math.random() - 0.5) * 2.0 * SIZE;
      // const y = (Math.random() - 0.5) * 2.0 * SIZE;
      // const z = (Math.random() - 0.5) * 2.0 * SIZE;
      var x = 0;
      var y = 0;
      var z = (Math.random() - 0.5) * 2.0 * LONG_SIZE;
      var point = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](x, y, z);
      point.velocityZ = Math.random();
      point.theta = 2 * Math.PI * Math.random();
      point.rotation = (Math.random() - 0.5) * 2.0;
      geometry.vertices.push(point);
      geometry.colors.push(new three__WEBPACK_IMPORTED_MODULE_1__["Color"](Math.random() * 0x00ffff));
    }

    points = Object(_Points__WEBPACK_IMPORTED_MODULE_2__["Points"])(geometry); // シーンにパーティクルを追加

    scene.add(points); // 軸ヘルパー
    // axesHelper = new THREE.AxesHelper(5.0);
    // scene.add(axesHelper);
    // コントロール

    controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__["OrbitControls"](camera, renderer.domElement); // すべての初期化が完了したら描画を開始する

    run = true;
    startTime = Date.now();
    render();
  }

  function render() {
    // 再帰呼び出し
    if (run === true) {
      var vertices = points.geometry.vertices;
      var nowTime = (Date.now() - startTime) / 1000;
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

/***/ })

/******/ });
//# sourceMappingURL=app.js.map