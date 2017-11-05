
import config from '../config';

export default class Map{
	constructor(props){

	}
	
	load(){

	}
	
	draw(stage){
		
		console.log("draw map", config);
		let g = new createjs.Graphics();
		g.setStrokeStyle(1);
		g.beginStroke("#c0c0c0");
		//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

		//const height = 150;
		//const width  = 300;
		const height = config.MapHeight;
		const width = config.MapWidth;
		
		const width_interval = width * 1.0 / config.DivideX;
		for(let i=0; i< config.DivideX + 1 ; i++){
			g.moveTo(i * width_interval,      0);
			g.lineTo(i * width_interval, height);
		}
		const height_interval = height * 1.0 / config.DivideY;
		for(let i=0; i< config.DivideY + 1 ; i++){
			g.moveTo(    0, i * height_interval);
			g.lineTo(width, i * height_interval);
			
		}
		g.endStroke();
		
		const rect = new createjs.Shape(g);
		

		stage.addChild(rect);
	}

	getLocalPos(x, y){
		const height = config.MapHeight;
		const width = config.MapWidth;
		
		const width_interval = width / config.DivideX;
		const height_interval = height / config.DivideY;
		
		return {
			x: Math.floor(x / width_interval),
			y: Math.floor(y / height_interval),
		};

	}

	isEnterable(x, y){
		if(x < 0) return false;
		if(y < 0) return false;
		if(x >= config.DivideX) return false;
		if(y >= config.DivideY) return false;
		return true;
	}

	getPos(x, y){
		const height = config.MapHeight;
		const width = config.MapWidth;
		
		const width_interval = width / config.DivideX;
		const height_interval = height / config.DivideY;

		return {
			x: x *  width_interval,
			y: y * height_interval,
		}
	}
	
	
}
