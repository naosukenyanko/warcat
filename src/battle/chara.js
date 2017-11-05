import config from '../config';


export default class Charactor {
	constructor(props){
		for(let k in props){
			this[k] = props[k];
		}

		[
			"onClick", 
			"onPressMove", 
			"redraw", 
			"setPos"
		].forEach( (name) => {
			this[name] = this[name].bind(this);
		});
			
	}

	load(ops){
		const stage = ops.stage;
		const circle = new createjs.Shape();

		const height = config.ScreenHeight;
		const width = config.ScreenWidth;
		
		const width_interval = width / 5.0;
		const height_interval = height / 10.0;

		circle.graphics.beginFill("red")
			.drawCircle(width_interval/2.0, height_interval/2.0, height_interval / 2 - 8);
		circle.x = this.x * width_interval;
		circle.y = this.y * height_interval;
		//console.log(this.x, this.y);

		circle.addEventListener("click", this.onClick);
		circle.addEventListener("pressmove", this.onPressMove);


		this.circle = circle;

		stage.addChild(circle);
	}

	onClick(evt){
		console.log("click");
		//this.move(+1, 0);
	}
	
	onPressMove(evt){
		//console.log("StageXY", evt.stageX, evt.stageY);
		const height = config.ScreenHeight;
		const width = config.ScreenWidth;
		
		const width_interval = width / 5.0;
		const height_interval = height / 10.0;
		
		const x = Math.floor(evt.stageX / width_interval);
		const y = Math.floor(evt.stageY / height_interval);

		evt.preventDefault();
		this.setPos(x, y);
		//console.log("xy", x, y);
	}

	redraw(){
		const circle = this.circle;
		const height = config.ScreenHeight;
		const width = config.ScreenWidth;
		
		const width_interval = width / 5.0;
		const height_interval = height / 10.0;
		
		circle.x = this.x * width_interval;
		circle.y = this.y * height_interval;
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
