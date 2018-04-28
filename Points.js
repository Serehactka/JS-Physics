Point = function() {
	if (arguments.length == 2) {
		this.x = arguments[0];
		this.y = arguments[1];
	} else if (arguments.length == 1) {
		this.x = arguments[0].x;
		this.y = arguments[0].y;
	} else {
		this.x = 0;
		this.y = 0;
	}
}

Point.prototype = {
	sum: function() {
		if (arguments.length == 2) {
			var p1 = arguments[0],
				p2 = arguments[1];

			return new Point({
				x: p1.x + p2.x,
				y: p1.y + p2.y
			});

		} else if (arguments.length == 1) {
			p1 = arguments[0];

			this.x =  this.x + p1.x;
			this.y = this.y + p1.y;

			return this;

		} else return this;
	},

	diff: function() {
		if (arguments.length == 2) {
			var p1 = arguments[0],
				p2 = arguments[1];

			return new Point({
				x: p1.x - p2.x,
				y: p1.y - p2.y
			});

		} else if (arguments.length == 1) {
			p1 = arguments[0];

			this.x =  this.x - p1.x;
			this.y = this.y - p1.y;

			return this;

		} else return this;
	},

	multiply: function(n) {
		this.x *= n;
		this.y *= n;

		return this;
	},

	progression: function(n) {
		this.x *= n;
		this.y *= n;

		return this;
	},

	scalar: function() {
		if (arguments.length == 2) {
			var p1 = arguments[0],
				p2 = arguments[1];

			return p1.x * p2.x + p1.y * p2.y;

		} else if (arguments.length == 1) {
			p1 = arguments[0];

			return this.x * p1.x + this.y * p1.y;
		}
	},

	distance: function() {
		if (arguments.length == 2) {
			var p1 = arguments[0],
				p2 = arguments[1],
				dx = p1.x - p2.x,
				dy = p1.y - p2.y;

			return Math.pow( dx * dx + dy * dy, 0.5 );

		} else if (arguments.length == 1) {
			var p1 = arguments[0],
				dx = this.x - p1.x,
				dy = this.y - p1.y;

			return Math.pow( dx * dx + dy * dy, 0.5 );
		}
	},

	redefine: function() {
		if (arguments.length == 2) {
			this.x = arguments[0];
			this.y = arguments[1];
		} else if (arguments.length == 1) {
			this.x = arguments[0].x;
			this.y = arguments[0].y;
		} else {
			this.x = 0;
			this.y = 0;
		}

		return this;
	},

	_: function(err) {
		console.log(err);
	}
}