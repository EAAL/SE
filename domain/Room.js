Class = require('../Utils/Class.js')
Utils = require('../Utils/Utils.js')
var Room = Class.extend({
	constructor: function (data) {
		this.capacity = data.capacity;
		this.name = data.name;
		this.reserveTimes = [];
	},
	isAvailable: function (time, number) {
		if (number > this.capacity) {
			return false;
		}
		else {
			for (var i = this.reserveTimes.length - 1; i >= 0; i--) {
				if(Utils.overlap(this.reserveTimes[i], time))
					return false;
			}
			return true;
		}
	},
	reserve: function (time) {
		this.reserveTimes.push(time);
	}
});
