
import config from '../config';
import Charactor from './chara';
import manager from '../manager';
//console.log("config", config);


export default class BattleStage{
	constructor(props){
		//console.log("constructor");
		
		//this.manager = props.manager;

		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;
		
		var chara_list = [
			{"x": 1, "y": 2, "status": {}, "class": ""},
			{"x": 3, "y": 4, "status": {}, "class": ""},
		];
		
		this.charactors = chara_list.map(function(chara){
			return new Charactor(chara);
		});

		this.onTick = this.onTick.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	load(){
		const stage = this.stage;
	
		this.drawMap();
		this.loadCharactors();
		
		stage.update();

		createjs.Ticker.addEventListener("tick", this.onTick);
		stage.addEventListener("click", this.onClick);
	}
	
	clear(){
		const stage = this.stage;	
		createjs.Ticker.removeEventListener("tick", this.onTick);
		stage.removeEventListener("click", this.onClick);

		stage.clear();		
	}

	loadCharactors(){
		const stage = this.stage;
		this.charactors.forEach(function(chara){
			chara.load({stage:stage});
		});
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

	
	onTick(evt){
		//console.log("tick", this);
		this.stage.update();
	}

	onClick(evt){
		//console.log("onclick", manager);
		manager.show("menu");
	}

}



