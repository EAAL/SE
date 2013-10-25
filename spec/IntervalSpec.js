Vote =require('../domain/Vote.js');
Interval = require('../domain/Interval.js');
describe('Interval specs',function(){
	var vote1= new Vote();
	vote1.desc = 'yes';
	var votes1= [] ;
	votes1.push(vote1);
	var interval1=new Interval();
	interval1.votes.push(vote1);
	it("spec1",function(){
		expect(interval1.allInvitedOk()).toBe(true);
	});
	
});

