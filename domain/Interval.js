var Class = require('../Utils/Class.js')
var Interval=Class.extend({
	constructor:function(){
		this.votes = [];
		this.id = -1;
		this.date = 'Unknown';
		this.startTime = 'Unknown';
		this.endTime = 'Unknown';
	},
	constructor : function(votes, id, date, startTime, endTime){
		if (votes == null){
			this.votes = [];
		}else{
			this.votes = votes;
		}
		this.id = id;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
	},
	poll : function(vote){
		for(v in this.votes){
			if(v.user_id == vote.user_id){
				v.desc = vote.desc;
				return;
			}
		}
		this.votes.push(vote);
	},
	allInvitedOk:function(){
		for(var i=0 ; i < this.votes.length ; i++){
			if(this.votes[i].desc == 'no')return false;
		}
		return true;
	},
	moreThanHalfOk : function() {
		var numOk = 0;
		for(var i=0 ; i < this.votes.length ; i++){
			if( this.votes[i].desc == 'yes' || this.votes[i].desc == 'maybe') {
				numOk ++;
			}
		}
		if (numOk > (this.votes.length/2))return true;
		return false;
	},
	numSpecificVotes : function (voteDesc) {
		var num=0;
		for(var i=0; i<this.votes.length ; i++){
			if(this.votes[i].desc == voteDesc){
				num++;
			}
		}
		return num;
	}
});
module.exports = Interval

