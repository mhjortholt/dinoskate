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
