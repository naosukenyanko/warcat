
import config from '../config';
import Charactor from './chara';
import manager from '../manager';
import Map from './map';
import Buttons from './buttons';
//console.log("config", config);



function chara_set(){
	const copy = (obj) =>{
		return JSON.parse( JSON.stringify(obj) );
	};
	const default_status = {
		"hp_max": 800,
		"stamina_max": 800,
		"hp": 800,
		"stamina": 800,
		"atk": 24,
		"def": 8,
		"frc": 24,
		"int": 8,
	};
	const default_chara = {
		"x": 0, "y": 5, 
		"status": default_status,
		"class": "",
		"team": "red",
		"skill": 1,
	};

	
	var list = [];
	for(let i=0; i<5; i++){
		let chara = copy(default_chara);
		chara.x = i;
		chara.y = 100;
		chara.team = "red";
		list.push( chara );
	}
	for(let i=0; i<5; i++){
		let chara = copy(default_chara);
		chara.x = i;
		chara.y = 600;
		chara.team = "blue";
		list.push( chara );
	}
	
	
	return list;
}


export default class BattleStage{
	constructor(props){
		//console.log("constructor");
		
		//this.manager = props.manager;

		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;

		this.containers = {
			info: new createjs.Container(),
			map: new createjs.Container(),
			buttons: new createjs.Container(),
		};

		for(var c in this.containers){
			stage.addChild(this.containers[c]);
		}
				
		
		this.charactors = chara_set().map(function(chara){
			return new Charactor(chara);
		});

		this.map = new Map();
		this.buttons = new Buttons();

		this.onTick = this.onTick.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	load(){
		const stage = this.stage;
		const containers = this.containers;

		containers.map.x = 0;
		containers.map.y = 160;
		
		containers.buttons.x = 0;
		containers.buttons.y = config.ScreenHeight - 100;
		

		//this.map.draw(stage);
		this.map.draw(containers.map);
		this.buttons.draw(containers.buttons);
		
		this.loadCharactors(this.map);
		
		stage.update();

		createjs.Ticker.addEventListener("tick", this.onTick);
		//stage.addEventListener("click", this.onClick);
	}
	
	clear(){
		const stage = this.stage;
		//console.log("clear", stage.children);
		stage.removeAllChildren();
		createjs.Ticker.removeEventListener("tick", this.onTick);
		//stage.removeEventListener("click", this.onClick);

		stage.clear();		
	}

	loadCharactors(){
		//const stage = this.stage;
		const container = this.containers.map;
		const map = this.map;
		this.charactors.forEach( (chara)=>{
			chara.load({
				stage: container,
				map: map,
			});
		});
	}

	onTick(evt){
		//console.log("tick", this);
		const map = this.map;
		const stage = this.stage;

		this.charactors.forEach((chara)=>{
			chara.tick(self);
		});
		this.stage.update();
	}

	onClick(evt){
		//console.log("onclick", manager);
		manager.show("menu");
	}

}



