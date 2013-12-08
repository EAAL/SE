Room = require ('../domain/Room.js')
Event = require ('../domain/Event.js')
Interval = require ('../domain/Interval.js')
University = require ('../domain/University.js')
describe ('University Spec', function () {
	var Uni1= new University() ;
	//var rooms=[];
	var room1 = new Room({'capacity' : 20, 'name' : 'room1'});
	var date1 = new Date('25 Dec, 1995 23:15:00');
	var date2 = new Date('26 Dec, 1995 23:15:00');	
	room1.reserveTimes.push({'start': date1 , 'end' : date2});
	Uni1.rooms.push(room1);	

	var vote1= new Vote();
	vote1.desc= 'yes';
	var vote2 = new Vote();
	vote2.desc = 'no';


	var votes1= [] ;
	votes1.push(vote1);
	var interval1=new Interval();
	interval1.votes = votes1;
	interval1.startDate= new Date('24 Dec, 1995 23:15:00');
	interval1.endDate=new Date('24 Dec, 1995 23:15:00');
	var event1= new Event();
	event1.policy='all';
	event1.intervals.push(interval1);
	/*it('spec1' , function(){
		expect(Uni1.findRoomForInterval(interval1,1)).toBe(0);
	});
	
	it('spec2', function(){
		interval1.endDate = date2;
		expect(Uni1.findRoomForInterval(interval1,1)).toBe(-1);
	});*/
	it('spec3' , function (){
		expect(Uni1.findRoomForEvent(event1)).toBe(0);
	});	
});
