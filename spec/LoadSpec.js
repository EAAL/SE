DA = require ('../data_access/save.js');
Event = require ('../domain/Event.js');
when = require("when");

describe('Load Spec' , function (){
	it('spec1' , function(){
		//var ent;
		when(DA.loadEvent('event1'))
		.then(function(ent){
			console.log(ent);
			expect(ent.eventId).toBe('event1');	
			db.close();
		}, function (err) {
			console.log("Err " + err);
		});
	});
});
