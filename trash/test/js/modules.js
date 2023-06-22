var Modules = new (function() {

	function defaultConfig(config) {
		var default_config = {
			length: 100,
			tree: false,
			tileWidth: 50
		};
		if (config) {
			for (var key in config) {
				if ( config.hasOwnProperty(key)) {
					default_config[key] = config[key];
				}
			}
		}
		return default_config;
	}

	this.bigJump = function(config) {
		var segment = [];
		config = defaultConfig(config);
		segment.push({ x: 50, y: 0, tree: config.tree });
		segment.push({ x: 50, y: -50, tree: config.tree });
		segment.push({ x: 50, y: 0, tree: config.tree });
		segment.push({ x: 50, y: 50, tree: config.tree });
		segment.push({ x: 50, y: 50, tree: config.tree });
		segment.push({ x: 50, y: 25, tree: config.tree });
		segment.push({ x: 50, y: 25, tree: config.tree });
		return segment;
	};

	this.crevasse = function(config) {
		var segment = [];
		config = defaultConfig(config);
		segment.push({ x: 50, y: 20, tree: config.tree });
		segment.push({ x: 50, y: 500, tree: config.tree });
		segment.push({ x: 50, y: -450, tree: config.tree });
		segment.push({ x: 50, y: 20, tree: config.tree });
		return segment;
	};

	this.drop = function(config) {
		var segment = [];
		config = defaultConfig(config);
		segment.push({ x: 50, y: 25, tree: config.tree });
		segment.push({ x: 50, y: 500, tree: config.tree });
		segment.push({ x: 50, y: 25, tree: config.tree });
		return segment;
	};

	this.flat = function(config) {
		var segment = [];
		config = defaultConfig(config);
		for(var i = 0; i < config.length; i++) {
			segment.push({ x: config.tileWidth, y: 0, tree: false });
		}
		return segment;
	};

	this.ledge = function(config) { // need to be able to have dynamic x
		var segment = [];
		config = defaultConfig(config);
		segment.push({ x: 50, y: 10, tree: config.tree });
		segment.push({ x: 50, y: 100, tree: config.tree });
		segment.push({ x: 50, y: 10, tree: config.tree });
		segment.push({ x: 50, y: 20, tree: config.tree });
		segment.push({ x: 50, y: 50, tree: config.tree });
		return segment;
	};

	this.random = function(config) {
		var segment = [];
		config = defaultConfig(config);
		for(var i = 0; i < config.length; i++) {
			var addTree = random(0, config.length) < i;
			segment.push({ x: config.tileWidth, y: random(0, 100), tree: addTree});
		}
		return segment;
	};

	this.slope = function(config) {
		var segment = [];
		config = defaultConfig(config);
		for(var i = 0; i < config.length; i++) {
			segment.push({ x: 50, y: 50, tree: config.tree });
		}
		return segment;
	};

	this.stairs = function(config) {
		var segment = [];
		config = defaultConfig(config);
		segment.push({ x: 50, y: 0, tree: config.tree });
		for(var i = 0; i < 2; i++) {
			segment.push({ x: 28, y: 0, tree: config.tree });
			segment.push({ x: 0, y: 28, tree: config.tree });
		}
		segment.push({ x: 50, y: 0, tree: config.tree });
		return segment;
	};


	// experimental mix of all
	var modules = [
		this.drop,
		this.ledge,
		this.bigJump,
		this.slope
	];
	this.randomModules = function(config) {
		var segment = [];
		config = defaultConfig(config);
		for(var i = 0; i < config.length; i++) {
			segment.push(...modules[random(0, modules.length-1)](config));
		}
		return segment;
	};

	return this;

})();
