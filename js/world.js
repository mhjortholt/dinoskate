let world = {
	x: 0,
	y: 0,
	tiles: [
		{ w: 0, h: 0 },
		{ w: 200, h: 0 },
		{ w: 200, h: 30 },
		{ w: 250, h: 0 },
	]
}

// Add modules
world.tiles.push( ...Modules.stairs({ steps: 3 }));
world.tiles.push( ...Modules.straight({ length: 400 }));
world.tiles.push( ...Modules.box({ length: 150 }));
world.tiles.push( ...Modules.straight({ length: 400 }));
world.tiles.push( ...Modules.stairs({ steps: 5 }));
world.tiles.push( ...Modules.straight({ length: 400 }));
world.tiles.push( ...Modules.curb());
world.tiles.push( ...Modules.straight({ length: 400 }));
world.tiles.push( ...Modules.ramp());
world.tiles.push( ...Modules.straight({ length: 400 }));
world.tiles.push( ...Modules.gap({ length: 40 }));


world.tiles.push({ w: 20000, h: 0 }); // PADDED TILES TO BE SAFE
world.tiles.push({ w: 100, h: 0 });


let distanceX = 0, distanceY = 0;
for(let i = 0; i < world.tiles.length; i++) {
	let tile = world.tiles[i];
	distanceX += tile.w;
	distanceY += tile.h;
	tile.x = distanceX;
	tile.y = distanceY;
}

log(world.tiles)

/*
let box = {
	x: 500,
	y: world.y - 20,
	h: 20, 
	w: 30,
}*/

function updateWorld() {
	/*box.x -= 3;
	if(box.x < -box.w) {
		box.x = 500;
	}*/
	world.x -= 1.6;

	let targetY = worldY(wheel1);
	if(world.y !== targetY  ) {
		if (Math.abs(world.y - targetY) < 2) {
			world.y = targetY;
		} else if(world.y > targetY) {
			log('yooo1')
			world.y -= 1.42;
		} else {
			world.y += 1.42;
		}
	}
}

function drawWorld() {

}

function drawWorldHitboxes() {
	ctx.strokeStyle = '#00f';

	ctx.beginPath();
	ctx.moveTo(world.x, 0);

	for(let i = 0; i < world.tiles.length; i++) {
		let tile = world.tiles[i];
		ctx.lineTo(tile.x + world.x, tile.y );
	}
	ctx.stroke();


	// Objects
	/*ctx.strokeStyle = '#ff0';
	ctx.beginPath();
	ctx.rect(box.x, box.y, box.w, box.h);
	ctx.stroke();*/
}

function getTileId(obj) {
	for(var i = 0; i < world.tiles.length; i++) {
		if( world.tiles[i].x + world.x  > obj.x) {
			return Math.max(i-1, 0);
		};
	}
	return world.tiles.length - 1;
}

function worldY(obj) {

	let tile_id = getTileId(obj);
	let p1 = world.tiles[tile_id]
	let p2 = world.tiles[tile_id+1];
	let a = angleBetween( p1, p2);
	let dist = Math.abs(p1.x - obj.x + world.x)
	return Math.tan(a) * dist + p1.y;

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




/*
var World = function(config) {
	let that = this;
	
	this.tileWidth = 50;
	this.NUMBER_OF_TILES = 100;

	var x = config.x, y = config.y;
	var startX = x;
	this.list = [{x: x, y: y }];


	function addModule(func, conf) {
		var myModule = func(conf);
		for(var i = 0; i < myModule.length; i++) {
			var segment = myModule[i];
			x += segment.x;
			y += segment.y;
			that.list.push({ x: x, y: y, tree: segment.tree });
		}
	}

	//addModule(Modules.slope, { length: 5 });
	//addModule(Modules.stairs);
	//addModule(Modules.slope, { length: 5 });
	//addModule(Modules.crevasse);
	//addModule(Modules.drop, { tree: false });
	//addModule(Modules.bigJump);
	addModule(Modules.random, { length: 20, tileWidth: this.tileWidth });
	//addModule(Modules.drop, { tree: false });
	addModule(Modules.flat, { tileWidth: this.tileWidth, length: 100 });

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


/*

*/