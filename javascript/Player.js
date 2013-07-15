// Player object
// handles updating bitmapAnimation frames
// handles player position
// handles player hitbox
// constructor:
// 	moveSpeed: the rate at which the player will move, in pixels/second
// 	bmp: the player's bitmapAnimation, must already be a child of the stage to display
// 	animFPS: the rate at which the bitmapAnimation will be played
// 	stageFPS: the FPS of the stage
function Player( moveSpeed, bmp, animFPS, stageFPS) {
	DisplayObject.call( this, bmp, true, true );
	this.moveSpeed    = moveSpeed;
	// frameDivisor indicates how many frames should be skipped before advancing the animation's frame
	// allows the control of animation playback speed (ie. playing a 7fps animation on a 60fps canvas)
	this.frameDivisor = stageFPS / animFPS;
	this.frameCount   = 0;
	this.walk         = false;
}
Player.prototype = Object.create(DisplayObject.prototype);
Player.prototype.constructor = Player;
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