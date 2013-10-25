module.exports = new function(){
	this.overlap = function (t1, t2) {
		if(t1.end < t2.start || t1.start > t2.end)
			return false;
		return true;
	}
}