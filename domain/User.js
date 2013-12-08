Class = require('../Utils/Class.js');
Utils = require('../Utils/Utils.js');

var User = Class.extend({
	constructor: function(){
		this.email = 'Unkown';
		this.eventIds = [];
	}
});
module.exports = User
