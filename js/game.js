var requestID;

let player = {
	x: 32,
	y: 76 - 20, //76
	inAir: false,
	xv: 0,
	yv: 0
}


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

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function die(reason) {
	log('💀 Dead! Cause: ' + reason);
	stop();
}

function gameLoop() {

	// updatePlayer()

	updateDino();
	//updateWorld();

	// draw
	draw();


	checkInput();


	// controls
	updateTouch();
	drawTouch();

	requestID = requestAnimationFrame(gameLoop);
}

function drawTiles() {
	ctx.beginPath();

}

function draw() {
	clear();
	ctx.translate(0.5, 0.5);
	drawBackground();
	drawDino();
	drawWorld();
	drawTiles();
	ctx.translate(-0.5, -0.5);
}

function drawDino() {

	ctx.beginPath();

	ctx.imageSmoothingEnabled = false;
/*
	if (healPopper.poppin) {
		ctx.drawImage(pop, player.x, player.y);
	} else if(nosePopper.poppin) {
		ctx.drawImage(nolliepop, player.x, player.y);
	}else {
		ctx.drawImage(dino, player.x, player.y);
	}*/

	// hitbox
	ctx.beginPath();
	ctx.rect(player.x, player.y, 32, 40);
	ctx.strokeStyle = '#f00';
	ctx.stroke();

	// skate hitbox
	ctx.beginPath();
	ctx.rect(player.x - 8,  player.y + 40, 48, 4);
	ctx.rect(player.x    ,  player.y + 45, 5,  5); // wheel1
	ctx.rect(player.x + 28, player.y + 45, 5,  5); // wheel2
	ctx.strokeStyle = '#f00';
	ctx.stroke();
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
	if(keys[32] && !player.inAir) {
		jump();
	}
	if(keys[78] && !player.inAir) {
		healPress();
	}
	if(keys[75] && !player.inAir) {
		nosePress();
	}

	if(keys[37]) { //left
		
	}
	if(keys[39]) { // right
		
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
	player.inAir = true;
	player.yv = -3;
}

function updateDino() {
	
	if (player.yv > 0) {
		player.y += player.yv;
		player.yv *= 1.03;
	}

	if (player.yv < 0) {
		player.y += player.yv;
		player.yv *= 0.97;
		if ( player.yv > -0.5) {
			player.yv = 1;
		}
	}

	if(player.y > 96) {
		player.y = 96;
		player.yv = 0;
		player.inAir = false;
	}


}

let world = {
	x: 0,
	y: 128,
	tiles: [
		[ 0, 0, 100 ],
		[ 32, 32, 200],
	]
}
function drawWorld() {
	
	
	ctx.beginPath();
	ctx.moveTo(world.x, world.y);
	let traveled = 0;
	for(let i = 0; i < world.tiles.length; i++) {
		let tile = world.tiles[i];
		ctx.lineTo(world.x + (traveled), world.y + tile[0]);
		ctx.lineTo(tile[2], world.y + tile[1]);
		traveled += tile[2];
	}
	
	ctx.strokeStyle = '#00f';
	ctx.stroke();
}

function drawBackground() {
	//ctx.drawImage(background, 0, 0);
	ctx.beginPath();
	ctx.rect(0,0, 420, 224);
	ctx.fillStyle = '#fff';
	ctx.fill();
}






