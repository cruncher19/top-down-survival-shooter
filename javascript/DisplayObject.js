function DisplayObject(bmp, canCollide, isAnimated) {
    this.bmp = bmp;
    this.canCollide = canCollide || false;
    this.isAnimated = isAnimated || false;
}
DisplayObject.prototype.setPos = function( x, y ) {
    this.bmp.x = x;
	this.bmp.y = y;
}
DisplayObject.prototype.getPos = function(){
	return { x: this.bmp.x, y: this.bmp.y };
}
DisplayObject.prototype.getWidth = function(){
	return this.bmp.getBounds().width;
}
DisplayObject.prototype.getHeight = function(){
	return this.bmp.getBounds().height;
}
// a method used to test if a given point intersects with the physicalElement
DisplayObject.prototype.testPointCollision = function( x, y ) {
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
DisplayObject.prototype.testBoxCollision = function( x, y, width, height ) {
	var p1 = [ { x: this.bmp.x, y: this.bmp.y },
		{ x: x, y: y }
		];
	var p2 = [ { x: (this.bmp.x + this.getWidth()), y: (this.bmp.y + this.getHeight()) },
		{ x: (x + width), y: (y + height)}
		];
    //console.log("p1: {" + p1[0].x + ", " + p1[0].y +"}" + " p2: {" + p2[0].x + ", " + p2[0].y + "}");
    //console.log("p1: {" + p1[1].x + ", " + p1[1].y +"}" + " p2: {" + p2[1].x + ", " + p2[1].y + "}");
    if(!( (p2[0].y < p1[1].y) || (p1[0].y > p2[1].y) || (p2[0].x < p1[1].x) || (p1[0].x > p2[1].x) ))
        console.log("Hit!");
	return !( p2[0].y < p1[1].y || p1[0].y > p2[1].y || p2[0].x < p1[1].x || p1[0].x > p2[1].x );
}

//helper function used to test if a value falls within a range
function valueInRange( value, min, max) {
    return (value >= min) && (value <= max);
}