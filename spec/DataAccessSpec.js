Event = require('../domain/Event.js');
db = require('../dbconnection');
save = require('../data_access/save.js');
describe('Data access specs', function (){
	it("saves an event in the db" , function (){
		myEvent = new Event("aryaz");
		save.saveEvent(myEvent);
		expect(myEvent.eid).toBe("aryaz");
	});
});
