var db= require('../dbconnection')
module.exports=new function(){
	this.saveEvent = function (event){
		db.collection('events').save(event);
	},
	this.loadEvent = function (event_id){
		db.collection("events").findOne( {'eventId' : event_id} , function (err , data){
			if (!err){
				console.log("Don't have such event.\n");
			}
			else{
				console.log(data);
			}
		});
	}
}
