

let world = {
	x: 0,
	y: 150,
	tiles: [
		[ 0, 0, 100 ],
		[ 32, 32, 200],
	]
}

let box = {
	x: 500,
	y: world.y - 20,
	h: 20, 
	w: 30,
}

function updateWorld() {
	box.x -= 3;
	if(box.x < -box.w) {
		box.x = 500;
	}
}

function drawWorld() {
	/*ctx.beginPath();
	ctx.moveTo(world.x, world.y);
	ctx.lineTo(world.x + 600, world.y);
	ctx.strokeStyle = '#00f';
	ctx.stroke();*/
	
	ctx.beginPath();
	ctx.moveTo(world.x, world.y);
	/*let traveled = 0;
	for(let i = 0; i < world.tiles.length; i++) {
		let tile = world.tiles[i];
		ctx.lineTo(world.x + (traveled), world.y + tile[0]);
		ctx.lineTo(tile[2], world.y + tile[1]);
		traveled += tile[2];
	}*/
	ctx.lineTo(world.x + 500, world.y)
	ctx.strokeStyle = '#00f';
	ctx.stroke();

	// Objects
	ctx.strokeStyle = '#ff0';
	ctx.beginPath();
	ctx.rect(box.x, box.y, box.w, box.h);
	ctx.stroke();
}

function drawTiles() {
	//ctx.beginPath();

}

/*
var World = function(config) {
	let that = this;
	
	this.tileWidth = 50;
	this.NUMBER_OF_TILES = 100;

	var x = config.x, y = config.y;
	var startX = x;
	this.list = [{x: x, y: y }];


	var worldLength = 0;
	for(var i = 0; i < this.list.length - 100; i++) {
		worldLength += this.list[i].x;
	}

	this.getWorldLength = function() {
		return worldLength; //that.getNumberOfTiles() * this.tileWidth;
	};

	this.getNumberOfTiles = function() {
		return this.list.length - 100;
	};

	this.getTileId = function(x) {
		for(var i = 0; i < that.list.length; i++) {
			if(that.list[i].x > x) return Math.max(0, i-1);
		}
		return that.getNumberOfTiles();
	};

	this.getTileAngle = function(x) {
		var tileId = that.getTileId(x);
		var diffY = that.list[tileId+1].y - that.list[tileId].y;
		var diffX = that.list[tileId+1].x - that.list[tileId].x;
		var tileAngle = -Math.atan2(-diffY, -diffX) + Math.PI;
		return tileAngle;
	}

};
*/