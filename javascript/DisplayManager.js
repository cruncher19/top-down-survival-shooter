// Display Manager
// This will handle any elements that need to be displayed
// It will keep an array of items to be drawn on the screen
// Attributes:
//	displayItems[]
//	collisionQuadTree
//		*the collisionQuadTree will not be implemented initially, undecided as to how to move forward with hit detection

// DisplayManager constructor
function DisplayManager() {
	this.displayItems = [];
	this.collisionItems = [];
}

// add a display item to the array of display items
// display item must have the following properties:
//	X
//	y
//	width
//	height
//	updateFrames
// BitmapAnimation doesn't contain width and height, but this method knows how to handle BitmapAnimations
DisplayManager.prototype.addDisplayItem = function( displayItem ) {
	if( displayItem.hasOwnProperty('x') && displayItem.hasOwnProperty('y') &&
		displayItem.hasOwnProperty('width') && displayItem.hasOwnProperty('height') ){
		this.displayItems.push( displayItem );
		this.collisionItems.push( new physicalElement( displayItem.x, displayItem.y, displayItem.width, displayItem.height);
	}
	else if( typeof displayItem.getBounds === 'function' ) {
			rect = displayItem.getBounds();
			this.displayItems.push( displayItem );
			this.collisionItems.push( new physicalElement( rect.x, rect.y, rect.width, rect.height );
	}
	else {
		throw "DisplayManager.addDisplayItem() called on an invalid object";
	}
}



// an object used by DisplayManager to manage collision detection
// NOTE: may be replaced by quadtree as development progresses
// NOTE: collision detection only works with rectangular hitboxes currently, may be all that is necessary 
function physicalElement( x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
// a method used to test if a given point intersects with the physicalElement
physicalElement.prototype.testPointCollision = function( x, y ) {
	leftBound = this.x;
	rightBound = this.x + this.width;
	topBound = this.y;
	bottomBound = this.y + this.height;

	if( x < leftBound )
		return false;
	else if( x > rightBound )
		return false;
	else if( y < topBound )
		return false;
	else if( y > bottomBound )
		return false;
	else
		return true;
}
physicalElement.prototype.testBoxCollision = function( x, y, width, height ) {
	p1 = [ { x: this.x, y: this.y },
		{ x: x, y: y }
		];
	p2 = [ { x: (this.x + this.width), y: (this.y + this.height) },
		{ x: (x + width), y: (y + height)}
		];

	//! ( P2.y < P3.y || P1.y > P4.y || P2.x < P3.x || P1.x > P4.x )
	return !( p2[0].y < p1[1].y || p1[0].y > p2[1].y || p2[0].x < p1[1].x || p1[0].x > p2[1].x );
}	

//helper function used to test if a value falls within a range
function valueInRange( value, min, max) {
	return (value >= min) && (value <= max);
}
