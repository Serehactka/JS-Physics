var Vector = function(x1, y1, x2, y2, nrl = true, positive = true) {
	this.x1 = x1;
	this.y1 = y1;
	
	this.x2 = x2;
	this.y2 = y2;
	
	this.l_x1 = x1;
	this.l_x2 = x2;
	
	this.l_y1 = y1;
	this.l_y2 = y2;
	
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

	recount: function() {
		this.dx = this.x2 - this.x1;
		this.dy = this.y2 - this.y1;
		
		this.alpha = Math.atan(this.dy/this.dx);

		//console.log(Math.atan(this.dy/this.dx))
		
		this.delta = Math.pow(Math.pow(this.dx, 2) + Math.pow(this.dy, 2), 0.5);
	},

	scalyar: function(vector) {
		console.log(this.y2*vector.y2)
		return Math.pow(Math.abs(this.x2*vector.x2 + this.y2*vector.y2), 0.5);
	},

	toDefault: function() {
		this.x1 = this.l_x1;
		this.x2 = this.l_x2;
		this.y1 = this.l_y1;
		this.y2 = this.l_y2;

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

		console.log(this);

		return this;
	},

	negative: function(va, vb) {
		this.x2 = va.x2 - vb.x2;
		this.y2 = va.y2 - vb.y2;

		this.recount();

		console.log(this);

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

		console.log(this);

		return this;
	},
	
	normalize: function() {
		this.x2 = this.x2 - this.x1;
		this.y2 = this.y2 - this.y1;
	
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