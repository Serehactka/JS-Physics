Point = function() {
	if (arguments.length == 1) {
		this.x = x;
		this.y = y;
	} else {
		this.x = arguments[0].x;
		this.y = arguments[1].y;
	}	
}

Point.prototype = {
	sum: function(p1, p2) {
		return new Point();
	}
}