(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var Buttons = function () {
	function Buttons(porps) {
		_classCallCheck(this, Buttons);
	}

	_createClass(Buttons, [{
		key: 'draw',
		value: function draw(stage) {
			var rect = new createjs.Shape();
			rect.graphics.beginFill("#0000ff").drawRect(0, 0, 100, 100);
			rect.x = 0;
			rect.y = 0;
			stage.addChild(rect);

			var rect2 = new createjs.Shape();
			rect2.graphics.beginFill("#00ff00").drawRect(100, 0, 100, 100);
			rect2.x = 0;
			rect2.y = 0;
			stage.addChild(rect2);
		}
	}]);

	return Buttons;
}();

exports.default = Buttons;

},{"../config":6,"../manager":7}],2:[function(require,module,exports){
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

		["onClick", "onPressMove", "setPos"].forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
	}

	_createClass(Charactor, [{
		key: "load",
		value: function load(ops) {
			var _this2 = this;

			var self = this;
			var stage = ops.stage;
			var map = ops.map;
			var circle = new createjs.Shape();

			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;

			var width_interval = width / _config2.default.DivideX;
			var height_interval = height / _config2.default.DivideY;

			var team = this.team;

			circle.graphics.beginFill(team).drawCircle(width_interval / 2.0, height_interval / 2.0, height_interval / 2 - 8);

			//console.log(this.x, this.y);

			//circle.addEventListener("click", this.onClick);
			circle.addEventListener("pressmove", function (evt) {
				var pos = map.getLocalPos(evt.stageX - stage.x, evt.stageY - stage.y);
				if (map.isEnterable(pos.x, pos.y)) {
					evt.preventDefault();
					_this2.setPos(pos.x, pos.y);
				}
			}.bind(this));

			var draw = function draw() {
				var pos = map.getPos(_this2.x, _this2.y);
				circle.x = pos.x;
				circle.y = pos.y;
			};

			draw();
			this.redraw = draw.bind(this);

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

		/*
  redraw(){
  	const circle = this.circle;
  	const height = config.ScreenHeight;
  	const width = config.ScreenWidth;
  	
  	const width_interval = width / 5.0;
  	const height_interval = height / 10.0;
  	
  	circle.x = this.x * width_interval;
  	circle.y = this.y * height_interval;
  }
  */

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

},{"../config":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _chara2 = require('./chara');

var _chara3 = _interopRequireDefault(_chara2);

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _buttons = require('./buttons');

var _buttons2 = _interopRequireDefault(_buttons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//console.log("config", config);


function chara_set() {
	var copy = function copy(obj) {
		return JSON.parse(JSON.stringify(obj));
	};
	var default_status = {
		"hp_max": 800,
		"stamina_max": 800,
		"hp": 800,
		"stamina": 800,
		"atk": 24,
		"def": 8,
		"frc": 24,
		"int": 8
	};
	var default_chara = {
		"x": 0, "y": 5,
		"status": default_status,
		"class": "",
		"team": "red",
		"skill": 1
	};

	var list = [];
	for (var i = 0; i < 5; i++) {
		var chara = copy(default_chara);
		chara.x = i;
		chara.y = 1;
		chara.team = "red";
		list.push(chara);
	}
	for (var _i = 0; _i < 5; _i++) {
		var _chara = copy(default_chara);
		_chara.x = _i;
		_chara.y = 6;
		_chara.team = "blue";
		list.push(_chara);
	}

	return list;
}

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

		this.containers = {
			info: new createjs.Container(),
			map: new createjs.Container(),
			buttons: new createjs.Container()
		};

		for (var c in this.containers) {
			stage.addChild(this.containers[c]);
		}

		this.charactors = chara_set().map(function (chara) {
			return new _chara3.default(chara);
		});

		this.map = new _map2.default();
		this.buttons = new _buttons2.default();

		this.onTick = this.onTick.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	_createClass(BattleStage, [{
		key: 'load',
		value: function load() {
			var stage = this.stage;
			var containers = this.containers;

			containers.map.x = 0;
			containers.map.y = 160;

			containers.buttons.x = 0;
			containers.buttons.y = _config2.default.ScreenHeight - 100;

			//this.map.draw(stage);
			this.map.draw(containers.map);
			this.buttons.draw(containers.buttons);
			this.loadCharactors(this.map);

			stage.update();

			createjs.Ticker.addEventListener("tick", this.onTick);
			//stage.addEventListener("click", this.onClick);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var stage = this.stage;
			//console.log("clear", stage.children);
			stage.removeAllChildren();
			createjs.Ticker.removeEventListener("tick", this.onTick);
			//stage.removeEventListener("click", this.onClick);

			stage.clear();
		}
	}, {
		key: 'loadCharactors',
		value: function loadCharactors() {
			//const stage = this.stage;
			var container = this.containers.map;
			var map = this.map;
			this.charactors.forEach(function (chara) {
				chara.load({
					stage: container,
					map: map
				});
			});
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

},{"../config":6,"../manager":7,"./buttons":1,"./chara":2,"./map":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
	function Map(props) {
		_classCallCheck(this, Map);
	}

	_createClass(Map, [{
		key: "load",
		value: function load() {}
	}, {
		key: "draw",
		value: function draw(stage) {

			console.log("draw map", _config2.default);
			var g = new createjs.Graphics();
			g.setStrokeStyle(1);
			g.beginStroke("#c0c0c0");
			//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

			//const height = 150;
			//const width  = 300;
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;

			var width_interval = width * 1.0 / _config2.default.DivideX;
			for (var i = 0; i < _config2.default.DivideX + 1; i++) {
				g.moveTo(i * width_interval, 0);
				g.lineTo(i * width_interval, height);
			}
			var height_interval = height * 1.0 / _config2.default.DivideY;
			for (var _i = 0; _i < _config2.default.DivideY + 1; _i++) {
				g.moveTo(0, _i * height_interval);
				g.lineTo(width, _i * height_interval);
			}
			g.endStroke();

			var rect = new createjs.Shape(g);

			stage.addChild(rect);
		}
	}, {
		key: "getLocalPos",
		value: function getLocalPos(x, y) {
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;

			var width_interval = width / _config2.default.DivideX;
			var height_interval = height / _config2.default.DivideY;

			return {
				x: Math.floor(x / width_interval),
				y: Math.floor(y / height_interval)
			};
		}
	}, {
		key: "isEnterable",
		value: function isEnterable(x, y) {
			if (x < 0) return false;
			if (y < 0) return false;
			if (x >= _config2.default.DivideX) return false;
			if (y >= _config2.default.DivideY) return false;
			return true;
		}
	}, {
		key: "getPos",
		value: function getPos(x, y) {
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;

			var width_interval = width / _config2.default.DivideX;
			var height_interval = height / _config2.default.DivideY;

			return {
				x: x * width_interval,
				y: y * height_interval
			};
		}
	}]);

	return Map;
}();

exports.default = Map;

},{"../config":6}],5:[function(require,module,exports){
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

},{"./manager":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var config = {
	ScreenHeight: 1120,
	ScreenWidth: 640,
	DivideX: 5,
	DivideY: 8,
	MapHeight: 860,
	MapWidth: 640
};

exports.default = config;

},{}],7:[function(require,module,exports){
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

},{"./routes":9}],8:[function(require,module,exports){
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
			stage.removeAllChildren();
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

},{"../config":6,"../manager":7}],9:[function(require,module,exports){
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

},{"./battle":3,"./menu":8}]},{},[5]);
