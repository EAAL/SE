var db= require('../dbconnection')
module.exports=new function(){
	this.saveEvent = function (event){
		//console.log(db)		
		db.collection('events').save(event);
	}
}
