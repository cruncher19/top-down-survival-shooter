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
	this.hitbox = bmp.spriteSheet.getFrameBounds();
	this.bmp = bmp;
	this.frameDivisor = stageFPS / animFPS;
	this.frameCount = 0;
	this.walk = false;
}

// get and set position using a position object with x and y attributes
Player.prototype.setPos = function( pos ) {
	this.bmp.x = pos.x;
	this.bmp.y = pos.y;
}
Player.prototype.getPos = function() {
	return { x: this.bmp.x, y: this.bmp.y };
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