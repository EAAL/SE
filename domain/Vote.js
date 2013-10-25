Class= require('./Class.js')
var Vote = Class.extend({
	constructor : function(){
		this.desc='Unknown';
		this.user_id = -1;
	}
});
module.exports =Vote
