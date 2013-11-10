Class = require('../Utils/Class.js');
ds = require ('../data_access/save.js');
when = require('when');
var University = Class.extend({
	constructor: function(roomsFileName) {
		this.rooms = [];
		fs = require('fs');
		fs.readFile(roomsFileName, 'utf8', function(err, data){
			if(err)
				return console.log(err);
			console.log(data);
			roomsData = JSON.parse(data);
			for (var i = roomsData.length - 1; i >= 0; i--) {
				this.rooms.push(new Room(roomsData[i]));
			};
		});
	},
	constructor : function (){
		this.rooms = [];
	},
	findRoomForInterval : function (interval,number){
		for(var i = 0; i < this.rooms.length ; i++){
			if(this.rooms[i].isAvailable({'start' : interval.startDate, 'end':interval.endDate},number))return i;
		}
		return -1;
	},
	findRoomForEvent : function (event, cb){
		var a;
		var numRoom;
		var event_data;
		var event_id = event.eid;
		when(ds.loadEvent(event_id)).then(function(data){
		console.log("!!! " + data);
			while(true){
				a = event.retNextProperTime();
				if(a == -1) return -1;
				numRoom = this.findRoomForInterval(event.stat[a].interval, (event.stat[a].yesVotes + event.stat[a].maybeVotes));
				if(numRoom != -1) break;
			}
			cb(numRoom);
		});
	}
});
module.exports = University;