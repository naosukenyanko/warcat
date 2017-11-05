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
		var _this = this;

		_classCallCheck(this, Charactor);

		for (var k in props) {
			this[k] = props[k];
		}

		["onClick", "onPressMove", "redraw", "setPos"].forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
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
			//console.log(this.x, this.y);

			circle.addEventListener("click", this.onClick);
			circle.addEventListener("pressmove", this.onPressMove);

			this.circle = circle;

			stage.addChild(circle);
		}
	}, {
		key: "onClick",
		value: function onClick(evt) {
			console.log("click");
			//this.move(+1, 0);
		}
	}, {
		key: "onPressMove",
		value: function onPressMove(evt) {
			//console.log("StageXY", evt.stageX, evt.stageY);
			var height = _config2.default.ScreenHeight;
			var width = _config2.default.ScreenWidth;

			var width_interval = width / 5.0;
			var height_interval = height / 10.0;

			var x = Math.floor(evt.stageX / width_interval);
			var y = Math.floor(evt.stageY / height_interval);

			evt.preventDefault();
			this.setPos(x, y);
			//console.log("xy", x, y);
		}
	}, {
		key: "redraw",
		value: function redraw() {
			var circle = this.circle;
			var height = _config2.default.ScreenHeight;
			var width = _config2.default.ScreenWidth;

			var width_interval = width / 5.0;
			var height_interval = height / 10.0;

			circle.x = this.x * width_interval;
			circle.y = this.y * height_interval;
		}
	}, {
		key: "move",
		value: function move(x, y) {
			this.x += x;
			this.y += y;
			this.redraw();
		}
	}, {
		key: "setPos",
		value: function setPos(x, y) {
			//console.log("set pos", x, y);
			if (x < 0) x = 0;
			if (y < 0) y = 0;
			if (x >= 5) x = 4;
			if (y >= 10) y = 9;

			this.x = x;
			this.y = y;
			this.redraw();
		}
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

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//console.log("config", config);


var BattleStage = function () {
	function BattleStage(props) {
		_classCallCheck(this, BattleStage);

		//console.log("constructor");

		//this.manager = props.manager;

		var stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;

		var chara_list = [{ "x": 1, "y": 2, "status": {}, "class": "" }, { "x": 3, "y": 4, "status": {}, "class": "" }];

		this.charactors = chara_list.map(function (chara) {
			return new _chara2.default(chara);
		});

		this.onTick = this.onTick.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	_createClass(BattleStage, [{
		key: 'load',
		value: function load() {
			var stage = this.stage;

			this.drawMap();
			this.loadCharactors();

			stage.update();

			createjs.Ticker.addEventListener("tick", this.onTick);
			stage.addEventListener("click", this.onClick);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var stage = this.stage;
			createjs.Ticker.removeEventListener("tick", this.onTick);
			stage.removeEventListener("click", this.onClick);

			stage.clear();
		}
	}, {
		key: 'loadCharactors',
		value: function loadCharactors() {
			var stage = this.stage;
			this.charactors.forEach(function (chara) {
				chara.load({ stage: stage });
			});
		}
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
	}, {
		key: 'onTick',
		value: function onTick(evt) {
			//console.log("tick", this);
			this.stage.update();
		}
	}, {
		key: 'onClick',
		value: function onClick(evt) {
			//console.log("onclick", manager);
			_manager2.default.show("menu");
		}
	}]);

	return BattleStage;
}();

exports.default = BattleStage;

},{"../config":4,"../manager":5,"./chara":1}],3:[function(require,module,exports){
"use strict";

var _manager = require("./manager");

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	console.log("init");

	//var stage = new BattleStage();
	//var stage = new Menu();
	//stage.load();

	_manager2.default.show("battle");
}
//import BattleStage from './battle';
//import Menu from './menu';


init();

},{"./manager":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var config = {
	ScreenHeight: 920,
	ScreenWidth: 640
};

exports.default = config;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
	function Manager(props) {
		_classCallCheck(this, Manager);

		var self = this;

		var stages = {};
		for (var route in _routes2.default) {
			var ops = {};
			//console.log("mount", route);
			stages[route] = new _routes2.default[route](ops);
		}

		this.stages = stages;
		this.current = undefined;
		this.show = this.show.bind(this);
	}

	_createClass(Manager, [{
		key: "show",
		value: function show(name) {
			var current = this.current;
			if (current) current.clear();
			var stage = this.stages[name];
			//console.log("stage", stage, name, this.stages);

			if (stage) {
				this.current = stage;
				stage.load();
			} else {
				console.error("not found", name);
			}
		}
	}]);

	return Manager;
}();

var manager = new Manager();
exports.default = manager;

},{"./routes":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
	function Menu(props) {
		_classCallCheck(this, Menu);

		var stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;
		this.onClick = this.onClick.bind(this);
	}

	_createClass(Menu, [{
		key: 'load',
		value: function load() {
			var stage = this.stage;
			this.drawMap();
			stage.update();

			stage.addEventListener("click", this.onClick);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var stage = this.stage;
			stage.clear();
			stage.removeEventListener("click", this.onClick);
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {

			var stage = this.stage;
			var rect = new createjs.Shape();
			rect.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
			rect.x = 0;
			rect.y = 0;
			stage.addChild(rect);
		}
	}, {
		key: 'onClick',
		value: function onClick(evt) {
			_manager2.default.show("battle");
		}
	}]);

	return Menu;
}();

exports.default = Menu;

},{"../config":4,"../manager":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _battle = require('./battle');

var _battle2 = _interopRequireDefault(_battle);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = {
	menu: _menu2.default,
	battle: _battle2.default
};

exports.default = routes;

},{"./battle":2,"./menu":6}]},{},[3]);
