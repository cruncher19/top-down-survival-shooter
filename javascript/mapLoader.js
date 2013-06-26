function loadMap( mapData, displayManager, stage ) {


	//load layer assets, init layers
	function initLayers() {
		var spriteSheets = [];
		var assets = [];
		var tileSize = {width: mapData.tilewidth, height: mapData.tileheight};

		//loading assets
		//setup loadQueue
		var loadQueue = new createjs.LoadQueue(false);
		loadQueue.addEventListener("fileload", handleFileLoad);
		loadQueue.addEventListener("complete", handleComplete);

		//create loadManifest from map file
		var manifest = [];
		var complete = false;
		for( var x = 0; x < mapData.tilesets.length; x++) 
			manifest.push( {id: mapData.tilesets[x].name, src: ( "assets/" + mapData.tilesets[x].image )} );
		loadQueue.loadManifest([manifest);
		while( !complete ){}
		return spriteSheets;

		// adding each asset to an array to be used later
		function handleFileLoad(event) {
	    	assets[event.item.id] = event.result;
		}
		// what to do after files are loaded
		function handleComplete(event) {
			for( var x = 0; x < assets.length; x++ ){
				spriteSheets[x] = new createjs.SpriteSheet({
					images : [ assets[x] ],
					frames : tileSize
				});

				spriteSheets[x].layer = mapData.layers[x];
				spriteSheets[x].tileSet = mapData.tilesets[x];
			}	
			complete = true;			
		}
	}

	function initLayer( spriteSheets ) {
		for( var y = 0; y < ; y++ ){
			for( var x = 0; x < layerData.width; x++ ){
				
			}
		}
}