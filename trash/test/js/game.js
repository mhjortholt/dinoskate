var gameInterval, score;
function start() {
	createWorld();
	
	drawBall();
	drawWorld();
	
	score = 0;
	addScore(0);
	play();
}

function stop() {
	clearInterval(gameInterval);
	document.getElementById('restart').style.display = 'block';
	log('Stopped');
}

function play() {
	gameInterval = setInterval(step, 20);
	document.getElementById('restart').style.display = 'hidden';
	log('Started');
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var world, worldX, worldY;

function createWorld() {
	world = new World({ x: 0, y: 100 });
	worldX = 0;
	worldY = 100;
}

function drawWorld() {
	var i;
	ctx.beginPath();
	ctx.moveTo(worldX + world.list[0].x, worldY + world.list[0].y);
	for(i = 1; i < world.list.length; i++) {
		ctx.lineTo( worldX + world.list[i].x, worldY + world.list[i].y);
	}
	// White
	if(graphics) {
		ctx.lineTo(worldX + world.list[world.list.length - 1].x, worldY + world.list[world.list.length - 1].y + 600);
		ctx.lineTo(worldX + world.list[0].x, worldY + world.list[world.list.length - 1].y + 600);
		ctx.fillStyle = "white";
		ctx.fill();
	}

	ctx.strokeStyle = "#ccc";
	ctx.stroke();

	for(i = 1; i < world.list.length; i++) {
		if(world.list[i].tree) {
			drawTree(worldX + world.list[i].x, worldY + world.list[i].y);
		}
	}

	if(worldY > -100) {
		drawHelicopter(worldX + ball.x - 20, worldY);
	} else {
		clearInterval(helival);
	}

	if(worldX < world.getWorldLength() ) {
		drawCabin(worldX + world.list[world.getNumberOfTiles()+11].x, worldY + world.list[world.getNumberOfTiles()+11].y);
	}
}
var cabin = document.getElementById('cabin');
function drawCabin(x, y) {
	ctx.drawImage( cabin, x + 20, y - 91);
}
var tree = document.getElementById('tree');
function drawTree(x, y) {
	ctx.drawImage( tree, x, y + 10, 64, 64);
}
var helicopter = document.getElementById('helicopter');
var heliFrame = 0;
var helival = setInterval(function() {
	heliFrame++;
	heliFrame = heliFrame % 5;
}, 100);
function drawHelicopter(x, y) {
	//ctx.drawImage( helicopter, worldX + ball.x, y);
	ctx.drawImage( helicopter, 0, (heliFrame) * 44, 96, 44, x, y, 96, 44);
	//ctx.drawImage( mike_break, (an) * 32, 0, 32, 32, -10, -28, 32, 32);
}

var ball ={ x: 80.5, y: 180.5 }; // { x: 100, y: 150}; //
function drawBall() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc( ball.x, ball.y, 5, Math.PI * 2, false);
	ctx.fill();
}
function drawSquare(v) {
	ctx.save();
	ctx.translate( ball.x, ball.y);
	ctx.rotate(v);
	ctx.fillStyle = "red";
	ctx.fillRect( -15, -25, 30, 50);
	ctx.restore();
}

var skier = document.getElementById("skier");
function drawSkier(v) {
	ctx.save();
	ctx.translate( ball.x, ball.y);
	ctx.rotate(v);
	var breaking = keys[40] || action.break;
	if(breaking) {
		ctx.drawImage( skier_break, -8, -16);
	} else {
		ctx.drawImage( skier, -8, -16);
	}
	ctx.restore();
}

var an = 0;
/*setInterval(function() {
	an++;
	an = an % 3;
}, 200);*/

function drawMike(v) {
	ctx.save();
	ctx.translate( ball.x, ball.y);
	ctx.rotate(v);
	var breaking = keys[37];
	var grabing = keys[38];
	if(breaking) {
		ctx.drawImage( mike_break, (an) * 32, 0, 32, 32, -10, -28, 32, 32);
	} else if(grabing) {
		ctx.drawImage( mike_grab, (an) * 32, 0, 32, 32, -10, -28, 32, 32);
	} else {
		ctx.drawImage( mike, (an) * 32, 0, 32, 32, -10, -28, 32, 32);
	}
	ctx.restore();
}

function drawShixt() {
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo( ball.x + 0.5, 0);
	ctx.lineTo( ball.x + 0.5, 10);
	ctx.stroke();
}

function addScore(s) {
	score += s;
	document.getElementById('score').innerHTML = score;
}

//var gravity = 1.15; // 9.82 // UNUSED

var startDirection = 3.2 * (Math.PI / 2), startSpeed = 1.5;

var speedY = getY(startSpeed, startDirection), speedX = getX(startSpeed, startDirection);

function getY(speed, direction) {
	return Math.sin(direction) * speed;
}
function getX(speed, direction) {
	return Math.cos(direction) * speed;	
}
var startGravity = 0.001, gravity = startGravity, gravityStep = 0.01, maxGravity = 0.2;
function addGravity() {

	speedY -= gravity;
	gravity += gravityStep;
	if(gravity > maxGravity) {
		gravity = maxGravity;
	}
}

function die(reason) {
	log('💀 Dead! Cause: ' + reason);
	stop();
}

var skierAngle = 0;
var onGround = false, prevTile, liftoffAngle = 0;
function step() {

	
	//var tile = Math.floor( Math.abs(worldX - ball.x) / world.tileWidth);
	var tile = world.getTileId(Math.abs(worldX - ball.x));

	var diffY = world.list[tile+1].y - world.list[tile].y;
	var tileAngle = -Math.atan2(-diffY, -world.tileWidth) + Math.PI;
	

	
	var tileAngle2 = world.getTileAngle(worldX - ball.x);

	
	log(tileAngle - tileAngle2);

/*
	if(tile > world.getNumberOfTiles() && ball.y < 300) { // ???
		ball.y += 1;
		worldY += 1;
	}
	*/

	var breaking = keys[40] || action.break;
	setOutput('breaking', breaking);

	//check for bounce
	if(isBelowGround()) {

		//bounce(tileAngle);
		moveBallToGround(0);

		var speed = getSpeed();
		var direction = tileAngle;

		var jumpX = 0, jumpY = 0;

		// speed dependant on tileAngle
		if(!onGround || (prevTile && prevTile !== tile)) {
			
			addScore( Math.floor((Math.abs(skierAngle - liftoffAngle) + (Math.PI / 2)) / (Math.PI * 2)) * 100);

			skierAngle = skierAngle % (2 * Math.PI);

			var impact = Math.abs(Math.abs(tileAngle - getDirection()) - (Math.PI / 2)) / (Math.PI / 2);
			
			var impactAngle = diffAngle(tileAngle, -skierAngle);
			var impactForce = (1.0 - impact) * speed;

			log('impact! force: ' + impactForce);
			if(impactForce > 12) {
				return die('impact to harsh: ' + impactForce);
			} else if (impactAngle > (Math.PI / 2) && impactAngle < (3*Math.PI/2)) {
				return die('wrong angle: ' + (impactAngle));
			}

			speed *= impact;
		} else {
			if(keys[38] || action.jump) {
				var jump = 1.5;
				jumpX = getX(jump, normRad(direction + (Math.PI/2)));
				jumpY = getY(jump, normRad(direction + (Math.PI/2)));

				log('JUMP: ' + direction);
			}
		}
		onGround = true;

		speedX = getX(speed, direction) + jumpX;
		speedY = getY(speed, direction) + jumpY;

		if(breaking) {
			speedX = speedX * 0.97;
		}

		gravity = startGravity;
	} else {

		if(onGround) {
			log('liftoff');
			liftoffAngle = skierAngle;
		}
		onGround = false;
	}

	setOutput('onGround', onGround);
	setOutput('direction', getDirection());
	setOutput('tileAngle', tileAngle);
	setOutput('skierAngle', skierAngle);

	addGravity();

	prevTile = tile;

	if(tile > world.getNumberOfTiles() + 10) {
		stop();
		return;
	}

	setOutput('speedX', speedX);
	setOutput('speedY', speedY);
	updateWorld();
	clear();
	
	if(onGround) {
		skierAngle = -tileAngle;
	} else {
		if(keys[37] || action.left) {
			skierAngle -= 0.1;
		} else if(keys[39] || action.right) {
			skierAngle += 0.1;
		}
	}
	
	switch(SKIER) {
		case 'ball':
			drawBall();
			break;
		case 'mike':
			drawMike(skierAngle);
			break;
		case 'skier':
			drawSkier(skierAngle);
			break;
		default:
			drawSquare(skierAngle);
			break;
	}

	drawWorld();
}

function bounce(tileAngle) {
	var normal = tileAngle - (3 * (Math.PI / 2));
	var direction = getDirection();
	var speed = getSpeed();
	var diff = (direction - Math.PI) - normal;

	direction = normal - diff;
	//direction = Math.PI / 2; vertical bounce

	if(speed > 20) {
		speed = 20;
	}

	speedX = getX(speed, direction);
	speedY = getY(speed, direction) + 0.1;
	gravity = startGravity;
}

var output = {};
function setOutput(key, value) {
	if(LOGGING && false) {
		output[key] = value;
		var html = '';
		for (var k in output) {
		    if (!output.hasOwnProperty(k)) continue;
		    html += k + ': ' + output[k] + '<br>'
		}
		document.getElementById('output').innerHTML = html;
	}
}

function updateWorld() {
	
	worldY += speedY;
	worldX -= speedX;

	setOutput('worldX', worldX);
	setOutput('worldY', worldY);

}

function isBelowGround() {
	return groundY() < ball.y; // Ball under world
}

function groundY() {
	var tile = Math.floor( Math.abs(worldX - ball.x) / world.tileWidth); // world.getTileId(worldX - ball.x);
	var diffY = world.list[tile+1].y - world.list[tile].y;
	var percX = Math.abs(((worldX - ball.x) % world.tileWidth) / world.tileWidth);
	var pad = diffY * percX;
	return world.list[tile].y + worldY + pad - 5;
}

function moveBallToGround(pad) {
	worldY += ball.y - groundY() + pad;
}

function getDirection() {
	var direction = Math.atan(speedY / speedX);
	if(direction < 0) {
		direction += Math.PI * 2;
	}
	return direction;
}

function getSpeed() {
	return Math.abs(Math.sqrt(speedY*speedY + speedX*speedX));
}




