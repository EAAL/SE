module.exports = new function(){
	this.overlap = function (t1, t2) {
		if(t1.end < t2.start || t1.start > t2.end)
			return false;
		return true;
	}
	this.compare1 = function(a,b){//TODO check
		if((a.yesVotes+a.maybeVotes)>(b.yesVotes+b.maybeVotes))return 1;
		if(((a.yesVotes+a.maybeVotes)==(b.yesVotes+b.maybeVotes))&&(a.maybeVotes<b.maybeVotes))return 1;
		return -1;
	}
}
