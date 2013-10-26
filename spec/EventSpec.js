Event = require('../domain/Event.js');
Vote = require ('../domain/Vote.js');
Utils = require('../Utils/Utils.js');
Interval = require ('../domain/Interval.js');
describe('Event Specs', function (){
	var interval1=new Interval();
	interval1.id='interval1';
	var interval2=new Interval();
	interval2.id='interval2';
	interval1.votes.push({'desc' : 'yes'});
	interval1.votes.push({'desc':'yes'});
	interval2.votes.push({'desc' : 'yes'});
	interval2.votes.push({'desc' : 'maybe'});

	var event1= new Event();
	event1.policy='all';
	event1.intervals.push(interval1);
	event1.intervals.push(interval2);
	/*it("spec 1 ", function(){
		console.log(interval1);
		console.log(interval2);
		expect(event1.sortProperTimes()).toBe('interval1');
	});*/
	it("spec 2 " , function(){
		interval1.votes.push({'desc':'yes'});
		//console.log(event1.intervals[0],0);
		//event1.sortProperTimes();
		//console.log(event1.stat);
		//console.log(event1.retNextProperTime());
		expect(event1.stat[event1.retNextProperTime()].interval.id).toBe('interval1');
		expect(event1.stat[event1.retNextProperTime()].interval.id).toBe('interval2');
	});
});
