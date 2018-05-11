var Emitter = function() {
	this.events = {};
}

Emitter.prototype = {
	subscribe: function(name, callback) {
		if (!this.events[name])
			this.events[name] = callback;
	},

	emit: function() {
		if (this.events[name]) {
			this.events[name](data);
		} else console.log('no-emmits');
	}
}