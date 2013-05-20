var canvas;
var stage;

var assets;

(function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	assets = [];

	//loading assets
	var queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", handleFileLoad);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest([
		{id: "houseInterior", src: "http://i.imgur.com/CZpVvJI.png"},
		{id: "mapJson", src: "map.json"},
		{id: "mapJson2", src: "map2.json"}
		]);

	// adding each asset to an array to be used later
	function handleFileLoad(event) {
    	assets[event.item.id] = event.result;
	}
	function handleComplete(event) {
		loadMap(assets["houseInterior"], assets["mapJson2"], stage);
		stage.update();
	}
})()