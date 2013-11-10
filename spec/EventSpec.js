Event = require('../domain/Event.js');
Vote = require ('../domain/Vote.js');
Utils = require('../Utils/Utils.js');
Interval = require ('../domain/Interval.js');
db = require ('../dbconnection');
describe('Event Specs', function (){
	var interval1 = new Interval();
	interval1.id ='interval1';
	var interval2 = new Interval();
	interval2.id='interval2';
	interval1.votes.push({'desc' : 'yes'});
	interval1.votes.push({'desc' : 'yes'});
	interval2.votes.push({'desc' : 'yes'});
	interval2.votes.push({'desc' : 'maybe'});

	var event1= new Event();
	event1.policy='all';
	event1.eventId='event1';
	event1.intervals.push(interval1);
	event1.intervals.push(interval2);
	/*it("spec 1 ", function(){
		console.log(interval1);
		console.log(interval2);
		expect(event1.sortProperTimes()).toBe('interval1');
	});*/
	
	it("spec 2 " , function(){
		//db.collection('events').save(event1);
		interval1.votes.push({'desc':'yes'});
		//db.collection('events').save(event1);
		//console.log(event1.intervals[0],0);
		//event1.sortProperTimes();
		//console.log(event1.stat);
		//console.log(event1.retNextProperTime());
		expect(event1.stat[event1.retNextProperTime()].interval.id).toBe('interval1');
		expect(event1.stat[event1.retNextProperTime()].interval.id).toBe('interval2');
		//db.close();

	});
	it(" spec 3 " , function (){
		db.collection('events').findOne({'eventId' : 'event1'} ,function (err, data){
			//console.log(data.policy);
			//var testEvent= new Event
			expect(data.policy).toBe('all');
		});
	});
	//db.close();
});
