Class = require('./Class.js')
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
	findRoomForInterval : function (interval,number){
		for(var i = 0; i < rooms.length-1 ; i++){
			if(this.rooms[i].isAvailable((interval.startDate, interval.endDate),number))return i;
		}
		return -1;
	},
	findRoomForEvent : function (event){
		var a;
		var numRoom;
		while(true){
			a= event.retNextProperTime();
			if(a== -1)return -1;
			numRoom=findRoomForInterval(event.stat[a].interval, (event.stat[a].yesVotes + event.stat[a].maybeVotes));
			if(numRoom != -1) break;
		}
		return numRoom;
	}
});
