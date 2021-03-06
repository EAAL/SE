Vote =require('../domain/Vote.js');
Interval = require('../domain/Interval.js');
describe('Interval specs',function(){
	var vote1= new Vote();
	vote1.desc= 'yes';
	var vote2 = new Vote();
	vote2.desc = 'no';


	var votes1= [] ;
	votes1.push(vote1);
	var interval1=new Interval();
	interval1.votes = votes1;
	it("spec1",function(){
		expect(interval1.allInvitedOk()).toBe(true);
	});
	it("spec2" , function(){
		expect(interval1.moreThanHalfOk()).toBe(true);
	});
	it("spec3" , function (){
		interval1.votes.push(vote2);
		expect(interval1.moreThanHalfOk()).toBe(false);
		expect(interval1.allInvitedOk()).toBe(false);
	});
	it("numSpecificVotes" , function (){
		/*var temp=[];
		temp.push({'desc' : 'yes' , 'reply' : 'no'});
		console.log(temp[0].desc);*/
		expect (interval1.numSpecificVotes('no')).toBe(1);
		expect (interval1.numSpecificVotes('yes')).toBe(1);
	});
});

