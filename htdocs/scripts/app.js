(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Charactor = function () {
	function Charactor(props) {
		_classCallCheck(this, Charactor);

		for (var k in props) {
			this[k] = props[k];
		}
	}

	_createClass(Charactor, [{
		key: "load",
		value: function load(ops) {
			var stage = ops.stage;
			var circle = new createjs.Shape();

			var height = _config2.default.ScreenHeight;
			var width = _config2.default.ScreenWidth;

			var width_interval = width / 5.0;
			var height_interval = height / 10.0;

			circle.graphics.beginFill("red").drawCircle(width_interval / 2.0, height_interval / 2.0, height_interval / 2 - 8);
			circle.x = this.x * width_interval;
			circle.y = this.y * height_interval;
			console.log(this.x, this.y);

			stage.addChild(circle);
		}
	}, {
		key: "move",
		value: function move(x, y) {}
	}]);

	return Charactor;
}();

exports.default = Charactor;
;

},{"../config":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _chara = require('./chara');

var _chara2 = _interopRequireDefault(_chara);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("config", _config2.default);

var BattleStage = function () {
	function BattleStage(prop) {
		_classCallCheck(this, BattleStage);

		//console.log("constructor");

		var stage = new createjs.Stage("appcontainer");

		this.stage = stage;

		var chara_list = [{ "x": 1, "y": 2, "status": {}, "class": "" }, { "x": 3, "y": 4, "status": {}, "class": "" }];

		this.charactors = chara_list.map(function (chara) {
			return new _chara2.default(chara);
		});
	}

	_createClass(BattleStage, [{
		key: 'load',
		value: function load() {
			var stage = this.stage;

			//console.log("load");

			this.drawMap();

			this.charactors.forEach(function (chara) {
				chara.load({ stage: stage });
			});

			stage.update();
		}
	}, {
		key: 'loadCharactors',
		value: function loadCharactors() {}
	}, {
		key: 'drawMap',
		value: function drawMap() {

			var stage = this.stage;

			var g = new createjs.Graphics();
			g.setStrokeStyle(1);
			g.beginStroke("#c0c0c0");
			//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

			//const height = 150;
			//const width  = 300;
			var height = _config2.default.ScreenHeight;
			var width = _config2.default.ScreenWidth;

			var width_interval = width / 5.0;
			for (var i = 0; i < 5 + 1; i++) {
				g.moveTo(i * width_interval, 0);
				g.lineTo(i * width_interval, height);
			}
			var height_interval = height / 10.0;
			for (var _i = 0; _i < 10 + 1; _i++) {
				g.moveTo(0, _i * height_interval);
				g.lineTo(width, _i * height_interval);
			}
			g.endStroke();

			var rect = new createjs.Shape(g);

			stage.addChild(rect);
		}
	}]);

	return BattleStage;
}();

exports.default = BattleStage;

},{"../config":4,"./chara":1}],3:[function(require,module,exports){
"use strict";

var _battle = require("./battle");

var _battle2 = _interopRequireDefault(_battle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScreenHeight = 1120;
var ScreenWidth = 640;

function drawCircle(stage) {
	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	//Set position of Shape instance.
	circle.x = circle.y = 50;
	//Add Shape instance to stage display list.
	stage.addChild(circle);
	//Update stage will render next frame
}

function drawRect(stage) {
	var rect = new createjs.Shape();
	rect.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
	rect.x = 0;
	rect.y = 0;
	stage.addChild(rect);

	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill("#00ff00").drawRect(100, 0, 100, 150);
	rect2.x = 0;
	rect2.y = 0;
	stage.addChild(rect2);

	var rect3 = new createjs.Shape();
	rect3.graphics.beginFill("#0000ff").drawRect(200, 0, 100, 100);
	rect3.x = 0;
	rect3.y = 0;
	stage.addChild(rect3);
}

function drawMap(stage) {

	var g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke("#c0c0c0");
	//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

	//const height = 150;
	//const width  = 300;
	var height = ScreenHeight;
	var width = ScreenWidth;

	var width_interval = width / 5.0;
	for (var i = 0; i < 5 + 1; i++) {
		g.moveTo(i * width_interval, 0);
		g.lineTo(i * width_interval, height);
	}
	var height_interval = height / 10.0;
	for (var _i = 0; _i < 10 + 1; _i++) {
		g.moveTo(0, _i * height_interval);
		g.lineTo(width, _i * height_interval);
	}
	g.endStroke();

	var rect = new createjs.Shape(g);

	stage.addChild(rect);
}

function init() {
	console.log("init");

	//Create a stage by getting a reference to the canvas
	//const stage = new createjs.Stage("appcontainer");


	//Create a Shape DisplayObject.
	//drawRect(stage);
	//drawMap(stage);
	//stage.update();

	var stage = new _battle2.default();
	stage.load();
}

init();

},{"./battle":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var config = {
	ScreenHeight: 1120,
	ScreenWidth: 640
};

exports.default = config;

},{}]},{},[3]);
