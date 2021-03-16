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
}

function drawDino() {
	if (popping) {
		ctx.drawImage(pop, x, y);
	} else if(nolliePopping) {
		ctx.drawImage(nolliepop, x, y);
	}else {
		ctx.drawImage(dino, x, y);
	}
}

let popppinTimer = false;
let nolliepopTimer = false;
function checkInput() {
	if(keys[32] && !inAir) {
		jump();
	}
	if(keys[78] && !inAir) {
		if(nolliePopping) {
			nolliePopping = false;
			jump();
			clearTimeout(nolliepopTimer);
		} else {
			clearTimeout(popppinTimer);
			popping = true;
			popppinTimer = setTimeout(function() {
				popping = false;
			}, 500);
		}
	}
	if(keys[75] && !inAir) {
		if (popping) {
			popping = false;
			jump();
			clearTimeout(popppinTimer);
		} else {
			clearTimeout(nolliepopTimer);
			nolliePopping = true;
			nolliepopTimer = setTimeout(function() {
				nolliePopping = false;
			}, 500);
		}
	}
}
let popping = false;
let nolliePopping = false;


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






