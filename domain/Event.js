Class = require('./Class.js')
Utils = require('../Utils/Utils.js');
var Event=Class.extend({
	constructor : function (){
		this.policy='Unknown';
		this.intervals=[];
		this.invited_users=[];
		this.nextProperIntervalIndex = 'Unknown';
		this.stat=[];
		this.startDate='Unknown';
		this.endDate='Unknown';
	},
	sortProperTimes : function(){
		for(var i = 0 ; i < this.intervals.length ; i++){
			if((this.intervals[i].allInvitedOk() == true && this.policy =='all') ||
			(this.intervals[i].moreThanHalfOk() == true && this.policy == 'half') ||
			(this.policy == 'max')){
				this.stat.push( {'index': this.intervals[i].id, 'yesVotes':this.intervals[i].numSpecificVotes('yes'), 'maybeVotes':this.intervals[i].numSpecificVotes('maybe'),
					'noVotes' : this.intervals[i].numSpecificVotes('no')});
			}
		}
		this.stat.sort(Utils.compare1);
		this.nextProperIntervalIndex=this.stat.length-1;
	},
	retNextProperTime : function (){
		if(this.nextProperIntervalIndex=='Unknown'){
			this.sortProperTimes();
			
		}
		else{this.nextProperIntervalIndex-=1;}
		return this.nextProperIntervalIndex;
		//TODO return Interval time
	}
	
});
module.exports = Event
