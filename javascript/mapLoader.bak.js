// this is a utility for loading maps from json format
// it accepts tileset as an image, mapdata as a json object, and the stage it will draw the tiles to
// loadMap will return an array containing all of the tiles
function loadMap( tileset, mapData, stage ) {
	var bitmapTiles = [];
	initLayers();
	return bitmapTiles;

	// loading layers
	function initLayers() {
		// compose EaselJS tileset from image (fixed 32x32 now, but can be parametized)
		var imageData = {
			images : [ tileset ],
			frames : {
				width : mapData.tilewidth,
				height : mapData.tileheight
			}
		};
		// create spritesheet
		var tilesetSheet = new createjs.SpriteSheet(imageData);
		
		// loading each layer at a time
		for (var idx = 0; idx < mapData.layers.length; idx++) {
			var layerData = mapData.layers[idx];
			initLayer(layerData, tilesetSheet, mapData.tilewidth, mapData.tileheight);
		}
	}
	
	// layer initialization
	function initLayer(layerData, tilesetSheet, tilewidth, tileheight) {
		for ( var y = 0; y < layerData.height; y++) {
			for ( var x = 0; x < layerData.width; x++) {
				// create a new Bitmap for each cell
				var current = bitmapTiles.push(new createjs.BitmapAnimation(tilesetSheet)) - 1;
				// layer data has single dimension array
				var idx = x + y * layerData.width;
				// tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)
				bitmapTiles[current].gotoAndStop(layerData.data[idx] - 1);
				// isometrix tile positioning based on X Y order from Tiled
				bitmapTiles[current].x = x * tilewidth;
				bitmapTiles[current].y = y * tileheight;
				// add bitmap to stage
				stage.addChild(bitmapTiles[current]);
			}
		}
	}
}