// Display Manager
// This will handle any elements that need to be displayed
// It will keep an array of items to be drawn on the screen
// Attributes:
//	displayItems[]
//	collisionQuadTree
//		*the collisionQuadTree will not be implemented initially, undecided as to how to move forward with hit detection


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DISPLAY MANAGER START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// DisplayManager constructor
function DisplayManager() {
	this.displayItems = [];
	this.collisionItems = [];
	this.animatedItems = [];
    this.count = 0;
}

// add a display item to the array of display items
// display item must have the following properties:
//	X
//	Y
//	updateFrames
// BitmapAnimation doesn't contain width and height, but this method knows how to handle BitmapAnimations
DisplayManager.prototype.addItem = function( displayItem, itemId ) {
	this.displayItems[itemId] = displayItem;
	if( displayItem.canCollide ){
		this.collisionItems[itemId] = displayItem;
        console.log("hit item: " + itemId);
        this.count += 1;
	}
	if( displayItem.isAnimated )
		this.animatedItems[itemId] = displayItem;
	return displayItem;
}
DisplayManager.prototype.getItem = function( itemId ) {
	return this.displayItems[itemId];
}
// method for use with collision detection
// will only search for the item in the site of items that are affected by collisions
DisplayManager.prototype.getCollisionItem = function( itemId ) {
	return this.collisionItems[itemId];
}
DisplayManager.prototype.updateFrames = function(){
	for( key in this.animatedItems )
		this.animatedItems[key].updateFrames();
}
DisplayManager.prototype.removeItem = function(itemId){
	delete this.displayItems[itemId];
	delete this.collisionItems[itemId];
}
// sets itemId's x and y coordinates and returns the previous coordinates
DisplayManager.prototype.setItemPos = function( itemId, x, y){
	this.displayItems[itemId].setPos( x, y );
}
// NOTE: this is mainly used for testing
// function uses the built in toString function of all objects in the display manager
DisplayManager.prototype.toString = function() {
	var returnVal = "";
	for( key in this.displayItems )
		returnVal += this.displayItems[key].toString() + "<br>";
	return returnVal;
}

// methods for moving items around, uses the time delta and movement speed to move smoothly regardless of framerate
// these methods check for collisions
DisplayManager.prototype.moveItemUp = function( itemId, delta ) {
	var item = this.collisionItems[itemId];
	var itemRect = item.bmp.getBounds();
	var newPos = item.bmp.y - (delta/1000 * item.moveSpeed);
	var colliding = false;
	for( key in this.collisionItems ) {
        //console.log("x: " + this.collisionItems[key].bmp.x + " y: " + this.collisionItems[key].bmp.y
        //    + " width: " + this.collisionItems[key].bmp.getBounds().width + " height: " + this.collisionItems[key].bmp.getBounds().height);
        if( key != itemId){
            //colliding = this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height ) || colliding;
            colliding = colliding || this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height );
        }
    }	
	if( !colliding )
		item.bmp.y = newPos;
}
DisplayManager.prototype.moveItemDown = function( itemId, delta) {
	var item = this.collisionItems[itemId];
	var itemRect = item.bmp.getBounds();
	var newPos = item.bmp.y + (delta/1000 * item.moveSpeed);
	var colliding = false;
    for( key in this.collisionItems ) {
        //console.log("x: " + this.collisionItems[key].bmp.x + " y: " + this.collisionItems[key].bmp.y
        //    + " width: " + this.collisionItems[key].bmp.getBounds().width + " height: " + this.collisionItems[key].bmp.getBounds().height);
        if( key != itemId){
            //colliding = this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height ) || colliding;
            colliding = colliding || this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height );
        }
    }
	if( !colliding )
		item.bmp.y = newPos;
}
DisplayManager.prototype.moveItemLeft = function( itemId, delta) {
	var item = this.collisionItems[itemId];
	var itemRect = item.bmp.getBounds();
	var newPos = item.bmp.x - (delta/1000 * item.moveSpeed);
	var colliding = false;
    for( key in this.collisionItems ) {
        //console.log("x: " + this.collisionItems[key].bmp.x + " y: " + this.collisionItems[key].bmp.y
        //    + " width: " + this.collisionItems[key].bmp.getBounds().width + " height: " + this.collisionItems[key].bmp.getBounds().height);
        if( key != itemId){
            //colliding = this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height ) || colliding;
            colliding = colliding || this.collisionItems[key].testBoxCollision( newPos, item.bmp.y, itemRect.width, itemRect.height );
        }
    }
	if( !colliding )
		item.bmp.x = newPos;
}
DisplayManager.prototype.moveItemRight = function( itemId, delta) {
	var item = this.collisionItems[itemId];
	var itemRect = item.bmp.getBounds();
	var newPos = item.bmp.x + (delta/1000 * item.moveSpeed);
	var colliding = false;
    for( key in this.collisionItems ) {
        //console.log("x: " + this.collisionItems[key].bmp.x + " y: " + this.collisionItems[key].bmp.y
        //    + " width: " + this.collisionItems[key].bmp.getBounds().width + " height: " + this.collisionItems[key].bmp.getBounds().height);
        if( key != itemId){
            //colliding = this.collisionItems[key].testBoxCollision( item.bmp.x, newPos, itemRect.width, itemRect.height ) || colliding;
            colliding = colliding || this.collisionItems[key].testBoxCollision( newPos, item.bmp.y, itemRect.width, itemRect.height );
        }
    }
	if( !colliding )
		item.bmp.x = newPos;
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DISPLAY MANAGER END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<INTERNAL METHODS AND OBJECTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
	var leftBound = this.x;
	var rightBound = this.x + this.width;
	var topBound = this.y;
	var bottomBound = this.y + this.height;

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
	var p1 = [ { x: this.x, y: this.y },
		{ x: x, y: y }
		];
	var p2 = [ { x: (this.x + this.width), y: (this.y + this.height) },
		{ x: (x + width), y: (y + height)}
		];

	//! ( P2.y < P3.y || P1.y > P4.y || P2.x < P3.x || P1.x > P4.x )
	return !( p2[0].y < p1[1].y || p1[0].y > p2[1].y || p2[0].x < p1[1].x || p1[0].x > p2[1].x );
}	

//helper function used to test if a value falls within a range
function valueInRange( value, min, max) {
	return (value >= min) && (value <= max);
}
