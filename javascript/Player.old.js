// Player object
// handles updating bitmapAnimation frames
// handles player position
// handles player hitbox
// constructor:
//		moveSpeed: the rate at which the player will me, in pixels/second
//		bmp: the player's bitmapAnimation, must already be a child of the stage to display
//		animFPS: the rate at which the bitmapAnimation will be played
//		stageFPS: the FPS of the stage
function Player( moveSpeed, bmp, animFPS, stageFPS) {
	//public attributes
	this.moveSpeed = moveSpeed;

	//private attributes, do not touch
	this.canCollide = true;
	this.isAnimated = true;
	this.bmp = bmp;
	// frameDivisor indicates how many frames should be skipped before advancing the animation's frame
	// allows the control of animation playback speed (ie. playing a 7fps animation on a 60fps canvas)
	this.frameDivisor = stageFPS / animFPS;
	this.frameCount   = 0;
	this.walk         = false;
}

Player.prototype.drawHitbox = function(stage) {
    var hitGraphics = new createjs.Graphics();
    hitGraphics.setStrokeStyle(1);
    hitGraphics.beginStroke("#1AFF00");
    hitGraphics.moveTo( this.bmp.x, this.bmp.y );
    hitGraphics.lineTo( this.bmp.x + this.bmp.getBounds().width, this.bmp.y );
    hitGraphics.lineTo( this.bmp.x + this.bmp.getBounds().width, this.bmp.y + this.bmp.getBounds().height );
    hitGraphics.lineTo( this.bmp.x, this.bmp.y + this.bmp.getBounds().height );
    hitGraphics.lineTo( this.bmp.x, this.bmp.y );
    
    var hitShape = new createjs.Shape(hitGraphics);
    stage.addChild(hitShape);
}

// get and set position using a position object with x and y attributes
Player.prototype.setPos = function( x, y ) {""
	this.bmp.x = x;
	this.bmp.y = y;
}
Player.prototype.getPos = function() {
	return { x: this.bmp.x, y: this.bmp.y };
}
// get width from bitmapAnimation
Player.prototype.getWidth = function(){
	return this.bmp.getBounds().width;
}
Player.prototype.getHeight = function(){
	return this.bmp.getBounds().height;
}

// updates the frame count, and determines whether or not to advance the animation frames
Player.prototype.updateFrames = function() {
	if( this.walk ) {
		this.frameCount += 1;
		if( this.frameCount >= this.frameDivisor ) {
			this.bmp.advance();
			this.frameCount = 0;
		}
	}
}

// sets the animation currently being played
Player.prototype.setCurrentAnim = function(anim) {
	if( this.bmp.currentAnimation != anim )
		this.bmp.gotoAndStop(anim);
}

// methods for enabling and disabling walk animations
Player.prototype.startWalking = function() {
	this.walk = true;
}
Player.prototype.stopWalking = function() {
	this.walk = false;
	this.bmp.gotoAndStop(this.bmp.currentAnimation);
	this.frameCount = 0;
}

// methods for moving the player
Player.prototype.moveUp = function(delta) {
	this.bmp.y -= delta/1000 * this.moveSpeed;
}
Player.prototype.moveDown = function(delta) {
	this.bmp.y += delta/1000 * this.moveSpeed;
}
Player.prototype.moveLeft = function(delta) {
	this.bmp.x -= delta/1000 * this.moveSpeed;
}
Player.prototype.moveRight = function(delta) {
	this.bmp.x += delta/1000 * this.moveSpeed;
}

// a method used to test if a given point intersects with the physicalElement
Player.prototype.testPointCollision = function( x, y ) {
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
Player.prototype.testBoxCollision = function( x, y, width, height ) {
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

