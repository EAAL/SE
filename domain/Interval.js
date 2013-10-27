Class =require('./Class.js')
var Interval=Class.extend({
	constructor:function(){
		this.votes=[];
		//this.start=-1;
		this.id='Unknown';
		this.startDate='Unknown';
		this.endDate='Unknown';
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
module.exports =Interval

