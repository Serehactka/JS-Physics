var Vector = function() {

	let nrl = true,
		positive = true;

	this.point1 = new Point();
	this.point2 = new Point();

	if (typeof arguments[arguments.length - 1] === "boolean") {
		if (typeof arguments[arguments.length - 2] === "boolean"){
			// console.log(arguments[arguments.length - 1], arguments[arguments.length - 2])
			nrl = arguments[arguments.length - 2];
			positive = arguments[arguments.length - 1];
			arguments.length -= 2;
		}
		else {
			nrl = arguments[arguments.length - 1];
			arguments.length -= 1;
		}
	}

	switch (arguments.length) {
		case 1:
			if (typeof arguments[0] === "object") {
				let point1 = arguments[0];

				this.point1 = new Point(0,0);
				this.point2 = new Point(arguments[0]);
			}
			break;

		case 2:
			if (typeof arguments[0] === "object" && typeof arguments[1] == "object") {
				let point1 = arguments[0],
					point2 = arguments[1];

				this.point1 = new Point(point1);
				this.point2 = new Point(point2);

			} else if (typeof arguments[0] === "number" && typeof arguments[1] == "number") {
				let x = arguments[0],
					y = arguments[1];

				this.point1 = new Point();
				this.point2 = new Point(x,y);
			}
			break;

		case 3:
			break;

		case 4:
			if (typeof arguments[0] === "number" && typeof arguments[1] === "number" && typeof arguments[2] === "number" && typeof arguments[3] === "number") {
				let x1 = arguments[0],
					y1 = arguments[1],
					x2 = arguments[2],
					y2 = arguments[3];

				this.point1 = new Point(x1,y1);
				this.point2 = new Point(x2,y2);

			} else this.setOneVector();
			break;

		default:
			this.setOneVector();
	}

	this.x1 = this.point1.x;
	this.y1 = this.point1.y;

	this.x2 = this.point2.x;
	this.y2 = this.point2.y;

	// this.x1 = x1;
	// this.y1 = y1;
	
	// this.x2 = x2;
	// this.y2 = y2;
	
	this.l_x1 = this.x1;
	this.l_x2 = this.x2;
	
	this.l_y1 = this.y1;
	this.l_y2 =	this.y2;
	
	if (nrl) {
		this.normalize();
	}

	this.positive = positive;
	
	this.dx = this.x2 - this.x1;
	this.dy = this.y2 - this.y1;
	
	this.alpha = Math.atan(this.dy/this.dx);
	
	this.delta = Math.pow(Math.pow(this.dx, 2) + Math.pow(this.dy, 2), 0.5);
}

Vector.prototype = {

	setOneVector: function() {
		this.x1 = 0; this.x2 = 1;
		this.y1 = 0; this.y2 = 1;

		this.recount();

		return this;
	},

	recount: function() {
		this.point1.redefine(this.x1, this.y1);
		this.point2.redefine(this.x2, this.y2);

		this.dx = this.x2 - this.x1;
		this.dy = this.y2 - this.y1;
		
		this.alpha = Math.atan(this.dy/this.dx);

		//console.log(Math.atan(this.dy/this.dx))
		
		this.delta = Math.pow(Math.pow(this.dx, 2) + Math.pow(this.dy, 2), 0.5);
	},

	scalar: function() {
		if (arguments.length == 1) {
			var vector = arguments[0];

			return Math.pow(Math.abs(this.dx*vector.dx + this.dy*vector.dy), 0.5);

		} else if (arguments.length == 0) {

			return Math.pow(Math.abs(this.dx*this.dx + this.dy*this.dy), 0.5);
		}

		return 0;
	},

	toDefault: function() {
		this.x1 = this.l_x1;
		this.x2 = this.l_x2;
		this.y1 = this.l_y1;
		this.y2 = this.l_y2;

		this.recount();

		return this;
	},
	
	updateDefault: function() {
		this.l_x1 = this.x1;
		this.l_x2 = this.x2;
		this.l_y1 = this.y1;
		this.l_y2 = this.y2;

		return this;
	},
	
	progression: function(n) {
		this.x1 *= n;
		this.x2 *= n;
		this.y1 *= n;
		this.y2 *= n;
		
		this.recount();

		return this;
	},

	negative: function(va, vb) {
		this.x2 = va.x2 - vb.x2;
		this.y2 = va.y2 - vb.y2;

		this.recount();

		return this;
	},

	advancedProgression: function(n, type) {
		switch (type) {
			case 'x':
				this.x1 *= n;
				this.x2 *= n;
				break;
			case 'y':
				this.y1 *= n;
				this.y2 *= n;
				break;
			default:
				this.progression(n);
		}

		this.recount();

		return this;
	},
	
	normalize: function() {
		this.x2 = this.x2 - this.x1;
		this.y2 = this.y2 - this.y1;

		this.point2.diff(this.point1);
		this.point1.redefine();

		this.x1 = 0;
		this.y1 = 0;

		this.recount();

		return this;
	},
	
	addVector: function(vector) {
		this.dx = this.dx + vector.dx;
		this.dy = this.dy + vector.dy;
		
		this.x2 = this.x1 + this.dx;
		this.y2 = this.y1 + this.dy;
		
		this.alpha = Math.atan(this.dy/this.dx);
		
		this.delta = Math.pow(Math.pow(this.dx, 2) + Math.pow(this.dy, 2), 0.5);

		console.log(this);

		return this;
	},

	copy: function(vector) {
		for (key in vector) {
			if (typeof this[key] !== 'function')
				this[key] = vector[key];
		}

		console.log(this);

		return this;
	},

	draw: function(color = "#000") {
		ctx.strokeStyle = color;

		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.stroke();

		ctx.fillStyle = "#f00";

		ctx.beginPath();
		ctx.arc(this.x2, this.y2, 5, 0, 2*Math.PI);
		ctx.fill();

		return this;
	}
}