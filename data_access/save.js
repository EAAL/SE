var db = require('../dbconnection');
var when = require('when');
module.exports=new function(){
	this.saveEvent = function (event){
		db.collection('events').save(event);
	},
	this.loadEvent = function (event_id){
		var deffered = when.defer();
		db.collection("events").findOne( {'eventId' : event_id} , function (err , data){
			if (err){
				deffered.reject("Don't have such event.\n");
				return;
			}else{
				deffered.resolve(data);
			}
		});
		return deffered.promise;
	}
}
