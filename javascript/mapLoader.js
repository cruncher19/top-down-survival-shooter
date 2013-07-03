function loadMap( mapData, displayManager, stage ) {
    var assets;
    var tileSize;
    var debug = false;
    initLayers();

	//load layer assets, init layers
	function initLayers() {
		var spriteSheets = [];
		assets = [];
		tileSize = {width: mapData.tilewidth, height: mapData.tileheight};

		//loading assets
		//setup loadQueue
		var loadQueue = new createjs.LoadQueue(false);
		loadQueue.addEventListener("fileload", handleFileLoad);
		loadQueue.addEventListener("complete", handleComplete);

		//create loadManifest from map file
		var manifest = [];
		for( var x = 0; x < mapData.tilesets.length; x++) 
			manifest.push( {id: (x + 1), src: ( "assets/" + mapData.tilesets[x].image )} );
		loadQueue.loadManifest(manifest);
		// while( !complete ){}
		// return spriteSheets;

		// adding each asset to an array to be used later
		function handleFileLoad(event) {
            assets[event.item.id] = event.result;
		}
		// what to do after files are loaded
		function handleComplete(event) {
			for( var x = 0; x < (assets.length - 1); x++ ){
				spriteSheets[x] = new createjs.SpriteSheet({
					images : [ assets[ x + 1 ] ],
					frames : tileSize
				});

				spriteSheets[x].layer = mapData.layers[x]; 
				spriteSheets[x].tileSet = mapData.tilesets[x];
                
			}
            initLayer( spriteSheets );		
		}
	}

	function initLayer( spriteSheets ) {
        var count = 0
		for( var y = 0; y < spriteSheets[0].layer.height; y++ ){
			for( var x = 0; x < spriteSheets[0].layer.width; x++ ){
                // create a new bitmap and scenery object for each
                
                // creating the bitmap animation
                var current = new createjs.BitmapAnimation(spriteSheets[0]);
                // calculate tile index
                var idx = x + (y * spriteSheets[0].layer.width);
                // set tile to display the correct image
                var tempFrame = spriteSheets[0].layer.data[idx] - 1;
                current.gotoAndStop(spriteSheets[0].layer.data[idx] - 1);
                // tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)
                current.x = x * spriteSheets[0].tileSet.tilewidth;
                current.y = y * spriteSheets[0].tileSet.tileheight;
                // add bitmap to the back of the stage
                stage.addChildAt(current, 0);
                var canCollide = false;
                if( spriteSheets[1].layer.data[idx] > 0 ){
                    canCollide = true;
                    count += 1;
                }
                var tempScenery = new Scenery( current, canCollide, false );
                displayManager.addItem( tempScenery, ('scenery' + idx) );
			}
		}
        console.log("DM count: " + displayManager.count);
        console.log(count);
        if( debug ){
            console.log("Collision Items: " + Object.keys(displayManager.collisionItems).length);
            count=0;
            for( var y = 0; y < spriteSheets[1].layer.height; y++){
                for( var x = 0; x < spriteSheets[1].layer.width; x++){
                    var current = new createjs.BitmapAnimation(spriteSheets[1]);
                    var idx = x + (y * spriteSheets[1].layer.width);
                    if( spriteSheets[1].layer.data[idx] > 0 ){
                        count += 1;
                        current.gotoAndStop(0);
                        current.x = x * spriteSheets[1].tileSet.tilewidth;
                        current.y = y * spriteSheets[1].tileSet.tileheight;
                        stage.addChild(current);
                    }
                }
            }
            console.log(count);
        }
    }
}