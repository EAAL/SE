Class = require('../Utils/Class.js');
ds = require ('../data_access/save.js');
Room = require('../domain/Room.js');
Event = require('../domain/Event.js');
Class = require('../Utils/Class.js')
var University = Class.extend({
	constructor : function () {
		var me = this;
		this.rooms = [];
		fs = require('fs');
		fs.readFile('Rooms.JSON', 'utf8', function(err, data){
			if(err)
				return console.log(err);
			roomsData = JSON.parse(data);
			for (var i = roomsData.length - 1; i >= 0; i--) {
				me.rooms.push(new Room(roomsData[i]));
			}
			console.log(me.rooms);
		});
	},
	findRoomForInterval : function (interval, number) {
		for(var i = 0; i < this.rooms.length ; i++){
			if(this.rooms[i].isAvailable({'start' : interval.startDate, 'end':interval.endDate}, number)){
			      return i;
			}
		}
		return -1;
	},
	findRoomForEvent : function (event, cb) {
		var a;
		var numRoom;
		//event.resetNextProperTime;
		while(true){
			a = event.retNextProperTime();
			if(a == -1) return cb(-1);
			numRoom = this.findRoomForInterval(event.stat[a].interval, (event.stat[a].yesVotes + event.stat[a].maybeVotes));
			if(numRoom != -1) break;
		}
		//console.log('numRoom is:'+numRoom);
		return cb(numRoom);
	}
});
module.exports = University;