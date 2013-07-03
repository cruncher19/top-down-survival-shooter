(function () {
	var assets = [];
	var stage = new createjs.Stage(document.getElementById("gameCanvas"));

	var queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", handleFileLoad);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest([{id: "houseInterior", src: "assets/tilesetHouse.png"}]);

	function handleFileLoad(event) {
		assets[event.item.id] = event.result;
	}
	function handleComplete(event) {
		var ssheet = new createjs.SpriteSheet({
			images: [assets["houseInterior"]],
		    	frames: {width: 32, height: 32}
		});
		var temp1 = new createjs.BitmapAnimation(ssheet);
		temp1.gotoAndStop(3);
		temp1.x = 30;
		temp1.y = 30;
		stage.addChild(temp1);
	        var temp2 = new createjs.BitmapAnimation(ssheet);
	    	temp2.gotoAndStop(20);
		temp2.x = 30;
		temp2.y = 62;
		stage.addChild(temp2);
		stage.update();

		scenery1 = new Scenery( temp1, true, false );
		scenery2 = new Scenery( temp2, true, false );

		console.log( scenery1.testBoxCollision( scenery2.bmp.x, scenery2.bmp.y, scenery2.bmp.getBounds().width, scenery2.bmp.getBounds().height ));
	}
})()
