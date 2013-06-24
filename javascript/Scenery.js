// Scenery is an object used to wrap scenery bitmapAnimations for use with the
// DisplayManager
function Scenery( bmp, canCollide, isAnimated ) {
	this.bmp = bmp;
	this.canCollide = canCollide || false;
	this.isAnimated = isAnimated || false;
}
Scenery.prototype.setPos = function( x, y ) {
	this.bmp.x = x;
	this.bmp.y = y;
}
Scenery.prototype.getPos = function(){
	return { x: this.bmp.x, y: this.bmp.y };
}
Scenery.prototype.getWidth = function(){
	return this.bmp.getBounds().width;
}
Scenery.prototype.getHeight = function(){
	return this.bmp.getBounds().height;
}
// a method used to test if a given point intersects with the physicalElement
Scenery.prototype.testPointCollision = function( x, y ) {
	var leftBound = this.x;
	var rightBound = this.x + this.getWidth();
	var topBound = this.y;
	var bottomBound = this.y + this.getHeight();

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
Scenery.prototype.testBoxCollision = function( x, y, width, height ) {
	var p1 = [ { x: this.x, y: this.y },
		{ x: x, y: y }
		];
	var p2 = [ { x: (this.x + this.getWidth()), y: (this.y + this.getHeight()) },
		{ x: (x + width), y: (y + height)}
		];

	return !( p2[0].y < p1[1].y || p1[0].y > p2[1].y || p2[0].x < p1[1].x || p1[0].x > p2[1].x );
}	

//helper function used to test if a value falls within a range
function valueInRange( value, min, max) {
	return (value >= min) && (value <= max);
}


