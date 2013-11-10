DA = require ('../data_access/save.js');
Event = require ('../domain/Event.js');
when = require("when");

describe('Load Spec' , function (){
	it('spec1' , function(){
		when(DA.loadEvent('aryaz'))
		.then(function(ent){
			console.log(ent);
			expect(ent.eid).toBe('aryaz');
			db.close();
		}, function (err) {
			console.log("Err " + err);
		});
	});
});
