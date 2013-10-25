Class =require('./Class.js')
var Interval=Class.extend({
	constructor:function(){
		this.votes=[];
		//this.start=-1;
	},
	allInvitedOk:function(){
		for(var i=0 ; i < this.votes.length ; i++){
			if(this.votes[i].desc != 'yes')return false;
		}
		return true;
	},
	moreThanHalfOk : function() {
		var numOk = 0;
		for(var i=0 ; i < this.votes.lentgh ; i++){
			if( this.votes[i].desc == 'yes') numOk ++;
		}
		if (numOk > (this.votes.lentgh/2))return true;
		return false;
	}
});
module.exports =Interval
