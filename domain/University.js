Class = require('./Class.js')
var University = Class.extend({
	constructor: function(roomsFileName) {
		rooms = [];
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
	}
});