function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
	clear();
	ctx.translate(0.5, 0.5);
	drawBackground();
	//drawDino();
	drawPlayer();
	drawWorld();
	drawTiles();
	if(DRAW_HITBOXES) {
		drawHitboxes();
	}
	ctx.translate(-0.5, -0.5);
}

function drawHitboxes() {
	ctx.strokeStyle = '#f00';
	//drawDinoHitboxes();
	drawPlayerHitboxes();
}

function drawBackground() {
	//ctx.drawImage(background, 0, 0);
	ctx.beginPath();
	ctx.rect(0,0, 420, 224);
	ctx.fillStyle = '#aaa';
	ctx.fill();
}

