import config from '../config';


export default class Charactor {
	constructor(props){
		for(let k in props){
			this[k] = props[k];
		}

		[
			"onClick", 
			//"onPressMove", 
			"setPos"
		].forEach( (name) => {
			this[name] = this[name].bind(this);
		});
			
	}

	load(ops){
		var self = this;
		const stage = ops.stage;
		const map = ops.map;
		const circle = new createjs.Shape();

		const height = config.MapHeight;
		const width = config.MapWidth;
		
		const width_interval = width / config.DivideX;
		const height_interval = height / config.DivideY;

		const team = this.team;

		circle.graphics.beginFill(team)
			.drawCircle(width_interval/2.0, height_interval/2.0, height_interval / 2 - 8);

		this.height = height_interval;

		//console.log(this.x, this.y);

		//circle.addEventListener("click", this.onClick);
		/*
		circle.addEventListener("pressmove", ((evt)=>{
			const pos = map.getLocalPos(evt.stageX - stage.x, 
										evt.stageY - stage.y);
			if( map.isEnterable(pos.x, pos.y) ){
				evt.preventDefault();
				this.setPos(pos.x, pos.y);
			}
		}).bind(this) );
		*/

		const draw = () => {
			const pos = map.getPos(this.x, this.y);
			circle.x = pos.x;
			circle.y = pos.y;
		};

		draw();
		this.redraw = draw.bind(this);

		this.circle = circle;

		stage.addChild(circle);
	}

	onClick(evt){
		console.log("click");
		//this.move(+1, 0);
	}

	tick(){
		if(this.team === "red"){
			this.y += 2;
		}else{
			this.y += -2;
		}
		const max = config.MapHeight - this.height;

		if(this.y < 0) this.y = 0;
		if(this.y >= max) this.y = max;
		this.redraw();
	}

	
	move(x, y){
		this.x += x;
		this.y += y;
		this.redraw();
	}

	setPos(x, y){
		//console.log("set pos", x, y);
		if(x < 0) x = 0;
		if(y < 0) y = 0;
		if(x >= 5) x = 4;
		if(y >= 10) y = 9;

		this.x = x;
		this.y = y;
		this.redraw();
	}
};
