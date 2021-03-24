var gameInterval;
var x = 24, y = 96;
var inAir = false;
var xv = 0;
var yv = 0;
function start() {
	
	play();
}

function stop() {
	clearInterval(gameInterval);
	log('Stopped');

	document.getElementById('pause').style.display = 'none';
	document.getElementById('restart').style.display = 'block';
}

function play() {
	gameInterval = setInterval(step, 20);
	log('Started');
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function die(reason) {
	log('💀 Dead! Cause: ' + reason);
	stop();
}


function step() {
	clear();
	drawBackground();
	drawDino();
	drawWorld();
	checkInput();
	updateDino();

	// controls
	updateTouch();
	drawTouch();
}

function drawDino() {
	if (healPopper.poppin) {
		ctx.drawImage(pop, x, y);
	} else if(nosePopper.poppin) {
		ctx.drawImage(nolliepop, x, y);
	}else {
		ctx.drawImage(dino, x, y);
	}
}

let healPopper = {
	timer: false,
	poppin: false
};
let nosePopper = {
	timer: false,
	poppin: false
};

function checkInput() {
	if(keys[32] && !inAir) {
		jump();
	}
	if(keys[78] && !inAir) {
		healPress();
	}
	if(keys[75] && !inAir) {
		nosePress();
	}
}

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


function jump() {
	inAir = true;
	yv = -14;
}

function updateDino() {
	
	if (yv > 0) {
		y += yv;
		yv *= 1.3;
	}

	if (yv < 0) {
		y += yv;
		yv *= 0.8;
		if ( yv > -1) {
			yv = 1;
		}
	}

	if(y > 96) {
		y = 96;
		yv = 0;
		inAir = false;
	}

	//Update rock
	rockX -= 4;
	if (rockX < -32) {
		rockX = 352;
	}
}
var rockX = 352;
function drawWorld() {
	ctx.drawImage(rock, rockX, 112);
}

function drawBackground() {
	ctx.drawImage(background, 0, 0);
}






