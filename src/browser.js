
import BattleStage from './battle';

const ScreenHeight = 1120;
const ScreenWidth = 640;

function drawCircle(stage){
	const circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	//Set position of Shape instance.
	circle.x = circle.y = 50;
	//Add Shape instance to stage display list.
	stage.addChild(circle);
	//Update stage will render next frame
}

function drawRect(stage){
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

function drawMap(stage){
	
	let g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke("#c0c0c0");
	//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

	//const height = 150;
	//const width  = 300;
	const height = ScreenHeight;
	const width = ScreenWidth;
	
	const width_interval = width / 5.0;
	for(let i=0; i< 5 + 1; i++){
		g.moveTo(i * width_interval,      0);
		g.lineTo(i * width_interval, height);
	}
	const height_interval = height / 10.0;
	for(let i=0; i<10 + 1 ; i++){
		g.moveTo(    0, i * height_interval);
		g.lineTo(width, i * height_interval);
		
	}
	g.endStroke();
	
	const rect = new createjs.Shape(g);
	

	stage.addChild(rect);
}


function init(){
	console.log("init");

	//Create a stage by getting a reference to the canvas
	//const stage = new createjs.Stage("appcontainer");
	
			
	//Create a Shape DisplayObject.
	//drawRect(stage);
	//drawMap(stage);
	//stage.update();
	
	var stage = new BattleStage();
	stage.load();
}

init();
