(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


function init(){
	//Create a stage by getting a reference to the canvas
	stage = new createjs.Stage("demoCanvas");
	//Create a Shape DisplayObject.
	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	//Set position of Shape instance.
	circle.x = circle.y = 50;
	//Add Shape instance to stage display list.
	stage.addChild(circle);
	//Update stage will render next frame
	stage.update();
}

},{}]},{},[1]);
