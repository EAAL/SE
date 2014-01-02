Class = require('../Utils/Class.js')
Utils = require('../Utils/Utils.js');
var Event=Class.extend({
	constructor : function (){
		this.title = 'Unknown';
		this.owner = 'Unknown';
		this.dead_line = 'Unknown';
		this.policy = 'Unknown';
		this.intervals = [];
		this.invited_users = [];
		this.nextProperIntervalIndex = 'Unknown';
		this.stat = [];
		this.eventId = 'Unknown';
	},
	constructor : function(title,owner,dead_line,policy,intervals,invited_users,nextProperIntervalIndex,stat,eventId){
		this.title = title;
		this.owner = owner;
		this.dead_line = dead_line;
		this.policy = policy;
		this.intervals = intervals;
		this.invited_users = invited_users;
		this.nextProperIntervalIndex = nextProperIntervalIndex;
		this.stat = stat;
		this.eventId = eventId;
	},
	sortProperTimes : function(){
		for(var i = 0 ; i < this.intervals.length ; i++){
			if((this.intervals[i].allInvitedOk() == true && this.policy =='full') ||
			(this.intervals[i].moreThanHalfOk() == true && this.policy == 'half') ||
			(this.policy == 'max')){
				this.stat.push({
								'interval': this.intervals[i],
								'yesVotes': this.intervals[i].numSpecificVotes('yes'),
								'maybeVotes': this.intervals[i].numSpecificVotes('maybe'),
								'noVotes': this.intervals[i].numSpecificVotes('no')
								});
			}
		}
		this.stat.sort(Utils.compare1);
		this.nextProperIntervalIndex=this.stat.length-1;
	},
	retNextProperTime : function () {
		if(this.nextProperIntervalIndex == 'Unknown'){
			this.sortProperTimes();
		}
		else{this.nextProperIntervalIndex-=1;}
		return this.nextProperIntervalIndex;
	},
	resetNextProperTime : function(){
		this.nextProperIntervalIndex = 'Unknown';
	}
	
});
module.exports = Event
