var requestID;

function start() {
	play();
}

function stop() {
	cancelAnimationFrame(requestID);
	log('Stopped');

	document.getElementById('pause').style.display = 'none';
	document.getElementById('restart').style.display = 'block';
}

function play() {
	gameLoop();
	log('Started');
}

function die(reason) {
	log('💀 Dead! Cause: ' + reason);
	stop();
}

function gameLoop() {

	updateWorld();
	updatePlayer();

	// draw
	draw();

	checkInput();

	// controls
	updateTouch();
	drawTouch();

	requestID = requestAnimationFrame(gameLoop);
}

function checkInput() {

	// TODO simulate touch??? or visualize

	if(keys[32]) { // SPACE
		jump();
	}
	if(keys[78]) { // N
		heelPress();
	}
	if(keys[75]) { // K
		nosePress();
	}

	if(keys[37]) { //left
		
	}
	if(keys[39]) { // right
		
	}
}

/*
let healPopper = {
	timer: false,
	poppin: false
};
let nosePopper = {
	timer: false,
	poppin: false
};

function healPress() {
	if(nosePopper.poppin) {
		nosePopper.poppin = false;
		jump();
		clearTimeout(nosePopper.timer);
	} else {
		clearTimeout(healPopper.timer);
		healPopper.poppin = true;
		healPopper.timer = setTimeout(function() {
			healPopper.poppin = false;
		}, 500);
	}
}

function nosePress() {
	if (healPopper.poppin) {
		healPopper.poppin = false;
		jump();
		clearTimeout(healPopper.timer);
	} else {
		clearTimeout(nosePopper.timer);
		nosePopper.poppin = true;
		nosePopper.timer = setTimeout(function() {
			nosePopper.poppin = false;
		}, 500);
	}
}
*/






