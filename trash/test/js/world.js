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
	//addModule(Modules.random, { length: 20, tileWidth: this.tileWidth });
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
