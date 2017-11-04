import config from '../config';


export default class Charactor {
	constructor(props){
		for(let k in props){
			this[k] = props[k];
		}
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
		console.log(this.x, this.y);

		stage.addChild(circle);
	}
	
	move(x, y){
		
	}
};
