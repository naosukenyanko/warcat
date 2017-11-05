
import config from '../config';
import manager from '../manager';

export default class Buttons {
	constructor(porps){

	}

	draw(stage){
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
	
}
