
import config from '../config';
import Charactor from './chara';
console.log("config", config);


export default class BattleStage{
	constructor(prop){
		//console.log("constructor");

		const stage = new createjs.Stage("appcontainer");

		this.stage = stage;
		
		var chara_list = [
			{"x": 1, "y": 2, "status": {}, "class": ""},
			{"x": 3, "y": 4, "status": {}, "class": ""},
		];
		
		this.charactors = chara_list.map(function(chara){
			return new Charactor(chara);
		});
		
	}

	load(){
		const stage = this.stage;
		
		//console.log("load");

		this.drawMap();

		this.charactors.forEach(function(chara){
			chara.load({stage:stage});
		});

		stage.update();
	}

	loadCharactors(){
		
	}

	drawMap(){

		const stage = this.stage;

		let g = new createjs.Graphics();
		g.setStrokeStyle(1);
		g.beginStroke("#c0c0c0");
		//g.beginFill("#ffffff").drawRect(0, 0, ScreenWidth, ScreenHeight);

		//const height = 150;
		//const width  = 300;
		const height = config.ScreenHeight;
		const width = config.ScreenWidth;
		
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

}



