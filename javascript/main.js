var canvas;
var stage;

var assets;
var mapTiles;
var playerSprite;
var player;
var playerSpeed = 150;

//keycodes:
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var space = 32;

var keyCodes = [];
keyCodes['38'] = 'up';
keyCodes['40'] = 'down';
keyCodes['37'] = 'left';
keyCodes['39'] = 'right';
keyCodes['32'] = 'space';

var wallID = [];


var pressedKeys;

(function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	assets = [];
	pressedKeys = [];
	dm = new DisplayManager();

	//loading assets
	var queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", handleFileLoad);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest([
		{id: "houseInterior", src: "assets/tilesetHouse.png"},
		{id: "maleSprite", src: "assets/maleBaseModel.png"},
		{id: "mapJson", src: "assets/map.json"},
		{id: "mapJson2", src: "assets/map2.json"}
		]);

	// adding each asset to an array to be used later
	function handleFileLoad(event) {
    	assets[event.item.id] = event.result;
	}
	function handleComplete(event) {
		mapTiles = loadMap(assets["houseInterior"], assets["mapJson2"], stage);

		playerSprite = new createjs.SpriteSheet({
			images: [assets["maleSprite"]],
			frames: [
				[32, 32, 32, 64],
				[96, 32, 32, 64],
				[160, 32, 32, 64],
				[224, 32, 32, 64],
				[288, 32, 32, 64],
				[32, 128, 32, 64],
				[96, 128, 32, 64],
				[160, 128, 32, 64],
				[224, 128, 32, 64],
				[288, 128, 32, 64],
				[32, 224, 32, 64],
				[96, 224, 32, 64],
				[160, 224, 32, 64],
				[224, 224, 32, 64],
				[288, 224, 32, 64],
				[32, 320, 32, 64],
				[96, 320, 32, 64],
				[160, 320, 32, 64],
				[224, 320, 32, 64],
				[288, 320, 32, 64]],
			animations: {
				down: [0, 4],
				right: [5, 9],
				up: [10, 14],
				left: [15, 19]
			}
		});
		var temp = new createjs.BitmapAnimation(playerSprite);
		temp.scaleX = temp.scaleY = 0.8;
		temp.gotoAndStop(0);
		stage.addChild(temp);
		player = dm.addItem( new Player( playerSpeed, temp, 5, 60 ), 'player' );
		dm.setItemPos( 'player', 100, 100 );
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener('tick', handleTick);
    	window.addEventListener('keydown', handleKeyDown);
    	window.addEventListener('keyup', handleKeyUp);
	}
})()

function handleTick(event){
	if( player.walk ) {
		if( pressedKeys.length == 0 ) {
			player.stopWalking();
		} else {
		    pressedKeys.forEach(function( element, index, array ) {
		        switch(element) {
		            case up:
		                player.moveUp(event.delta);
		                break;
		            case down:
		                player.moveDown(event.delta);
		                break;
		            case left:
		                player.moveLeft(event.delta);
		                break;
		            case right:
		                player.moveRight(event.delta);
		                break;
		        }
		    });
		    player.setCurrentAnim(keyCodes[pressedKeys[pressedKeys.length - 1].toString()]);
	    	player.updateFrames();
    	}
	} else {
		if( pressedKeys.length > 0 )
			player.startWalking();
	}
    stage.update();
}
function updateFrames(){
	player.frameCount += 1;
	if(player.frameCount >= 12) {
		player.advance();
		player.frameCount = 0;
	}
}
function handleKeyDown(event){
    if(pressedKeys.indexOf(event.which) === -1)
        pressedKeys.push(event.which);
}
function handleKeyUp(event){
    var keyIndex = pressedKeys.indexOf(event.which);
    if( keyIndex != -1 )
        pressedKeys.splice( keyIndex, 1);
}
