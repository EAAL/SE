Class = require('./Class.js')
Utils = require('../Utils/Utils.js');
//underscore = require ('./underscore.js')
var Event=Class.extend({
	constructor : function (){
		this.policy='Unknown';
		this.intervals=[];
		this.invited_users=[];
	},
	specifyProperTime : function(){
		var stat=[];
		for(var i = 0 ; i < this.intervals.length ; i++){
			if((this.intervals[i].allInvitedOk() == true && this.policy =='all') ||
			(this.intervals[i].moreThanHalfOk() == true && this.policy == 'half') ||
			(this.policy == 'max')){
				stat.push( {'index': this.intervals[i].id, 'yesVotes':this.intervals[i].numSpecificVotes('yes'), 'maybeVotes':this.intervals[i].numSpecificVotes('maybe'),
					'noVotes' : this.intervals[i].numSpecificVotes('no')});
					//TODO sort with underscore.js 
					//underscore.sortBy(stat,function);
			}
		}
		stat.sort(Utils.compare1);
		return stat[stat.length - 1].index;
	}
});
module.exports = Event
