let player = {

	skateboard: {
		wheel1: {
			x: 0,
			y: 0,
			r: 4,
			yv: 0,
			xv: 0
		},
		wheel2: {
			y: 0
		},
		board: {

		}
	}
/*
	x: 32,
	y: 76,
	inAir: true,
	xv: 0,
	yv: 1,
	h: 38,
	w: 25,*/


}
let wheel1 = {
	x: 40,
	y: 90,
	r: 4,
	h: 2,
	w: 2,
	vy: 0,
	vx: 0
};

const SKATEBOARD_LENGTH = 40;

let wheel2 = {
	x: wheel1.x + SKATEBOARD_LENGTH,
	y: wheel1.y - 30,
	r: 4,
	h: 2,
	w: 2,
	vy: 0,
	vx: 0
};

function updatePlayer() {

	// apply gravity to wheel 1
	if(touchesGround(wheel1)) {
		wheel1.vy = 0;
		wheel1.y = world.y - wheel1.h; // Tileprogress y typ
	} else {
		applyDownForce(wheel1);
	}
	wheel1.y += wheel1.vy;

	// apply gravity to wheel 2
	if(touchesGround(wheel2)) {
		wheel2.vy = 0;
		wheel2.y = world.y - wheel1.h; // Tileprogress y typ
	} else {
		applyDownForce(wheel2);
	}
	wheel2.y += wheel2.vy;

	// Correct wheel2
	let a = angleBetween(wheel1, wheel2);
	if(!touchesGround(wheel2)) {	
		wheel2.x = wheel1.x + Math.cos(a) * SKATEBOARD_LENGTH;
		wheel2.y = wheel1.y + Math.sin(a) * SKATEBOARD_LENGTH;
	} else {
		let y = wheel2.y -  wheel1.y;
		wheel2.x = wheel1.x + Math.sqrt(SKATEBOARD_LENGTH*SKATEBOARD_LENGTH - y*y);
	}

}



function updateDino() {
	/*
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

	// CHECK collisisons
	if(player.y + player.h > world.y) {
		player.y = world.y - player.h;
		player.yv = 0;
		player.inAir = false;
	}*/

}

function heelPress() {
	if(touchesGround(wheel1) && touchesGround(wheel2)) {
		jumpWheel2();
	} else if(touchesGround(wheel2)) {
		jumpWheel2();
		log('Nollie!')
	}
}

function nosePress() {
	if(touchesGround(wheel1) && touchesGround(wheel2)) {
		jumpWheel1();
	} else if(touchesGround(wheel1)) {
		jumpWheel1();
		log('Ollie!')
	}
}

function jumpWheel1() {
	if (touchesGround(wheel1)) {
		wheel1.vy = -3.0;
		wheel1.y = world.y - wheel1.h - 1; // lift off ground
	}
}

function jumpWheel2() {
	if(touchesGround(wheel2)) {
		wheel2.vy = -3.0;
		wheel2.y = world.y - wheel2.h - 1; // lift off ground
	}
}

function jump() {	
	jumpWheel1()
	jumpWheel2()
}

function touchesGround(obj) {
	return obj.y + obj.h >= world.y;
}

function applyDownForce(obj) {
	if(obj.vy < 0) {
		obj.vy *= 0.92;
		if(obj.vy > -0.1) {
			obj.vy = 0;
		}
	} else {
		if(obj.vy === 0) {
			obj.vy = 0.1;
		}
		obj.vy *= 1.08;
	}
}

function drawPlayer() {

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
}

function drawPlayerHitboxes() {
	// wheel1
	ctx.beginPath();
	ctx.arc(wheel1.x, wheel1.y, wheel1.r, 0, 2 * Math.PI);
	ctx.stroke();

	// wheel2
	ctx.beginPath();
	ctx.arc(wheel2.x, wheel2.y, wheel2.r, 0, 2 * Math.PI);
	ctx.stroke();

	// board
	ctx.save();
	let a = angleBetween(wheel1, wheel2);
	ctx.beginPath();
	
	ctx.translate( wheel1.x, wheel1.y);
	ctx.rotate(a);
	ctx.translate( -wheel1.x, -wheel1.y);

	ctx.rect(wheel1.x - 15, wheel1.y-8, SKATEBOARD_LENGTH + 30, 2);
	ctx.stroke();

	ctx.restore();

}

function drawDinoHitboxes() {
	// player hitbox
	ctx.beginPath();
	ctx.rect(player.x, player.y, player.w, player.h);
	ctx.stroke();
}



