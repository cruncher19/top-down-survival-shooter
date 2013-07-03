(function () {
	var input = "";
	var output = "";
	var dm = new DisplayManager();

	for( var x=0; x < 15; x++ ){
		var currentItem = new testItem( x, x, x, x );
		dm.addItem(currentItem, x);
		dm.updateFrames();
		//input += currentItem.toString() + "<br>";
	}
	input = dm.toString();
	document.getElementById("inputDiv").innerHTML = input;

	for( var x=0; x < 15; x++ ){
		dm.setItemPos( x, 50, 50 );
	}
	output = dm.toString();
	document.getElementById("setItemPosDiv").innerHTML = output;

	var removeItemTestOutput = "";
	for( var x=0; x<5; x++ ){
		dm.removeItem(x);
		removeItemTestOutput += dm.toString()+"<br>";
	}
	document.getElementById("removeItemDiv").innerHTML = removeItemTestOutput;

	
	function testItem( x, y, width, height ) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.frameCount = 0;
		this.toString = function() {
			return "{ X: " + this.x + ", Y: " + this.y + ", width: " + this.width + ", height: " + this.height + ", frames: " + this.frameCount  + "}";
		}
		this.updateFrames = function() {
			this.frameCount += 1;
		}

	}
})()

