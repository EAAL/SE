var data = require("../data_access/save.js");
var db = require('../dbconnection');
var Event = require('../domain/Event.js');
var when = require('when');
var email = require('../node_modules/emailjs/email');
var User = require('../emailData.js');
var server  = email.server.connect({
   user:    User.username,
   password:User.password,
   host:    "smtp.gmail.com",
   ssl:     true

});
module.exports = new function () {

	this.create = function (title , owner , intervals, invited , deadLine , policy){
		var new_event = new Event();
		new_event.title = title;
		new_event.owner = owner.email;
		new_event.intervals = intervals;
		new_event.invited_users = invited;
		new_event.dead_line = deadLine;
		new_event.policy = policy;
		db.events.count({} , function (err , cnt){
			console.log(cnt);
			new_event.eventId = cnt + 1;
			for (u in  invited){
				data.add_user_eventId(invited[u] , cnt + 1 );
			}
			data.saveEvent(new_event);
		});
	},

	this.event_load = function (email , eventId , callback){
		data.load_event(eventId , function (err , event){
			var votes = [];
			for(var i = 0;i < event.intervals.length; i++){
				var j;
				for(j = 0; j < event.intervals[i].votes.length; j++){
					if(event.intervals[i].votes[j].user_id === email){
						votes.push({'desc' : event.intervals[i].votes[j].desc , 'date' : event.intervals[i].date, 
									'startTime' : event.intervals[i].startTime ,'endTime' : event.intervals[i].endTime ,
									'intervalId' : event.intervals[i].id });
						break;
					}
				}
				if(j == event.intervals[i].votes.length){
					votes.push({'desc' : 'not voted', 'date' : event.intervals[i].date, 
								'startTime' : event.intervals[i].startTime ,'endTime' : event.intervals[i].endTime ,
								'intervalId' : event.intervals[i].id});
				}
			}
			return callback (votes , event.title);
		});
	},

	this.user_load = function (email , callback){
		data.load_user(email , function (err , user){
			console.log(user);
			return callback(err , user);
		});
	},

	this.save_votes = function (votes , id , callback){
		data.update_vote(votes , id , function (){
			return callback();
		});
	},

	this.delete_vote = function (email , eventId , intervalId , callback){
		data.delete_vote(email , eventId , intervalId , function (err){
			return callback(err);
		});
	},

	this.owner_events = function (email , callback){
		data.load_all_events(email , function(data) {
			callback(data);
		});
	}

	this.loadOne_event = function (eventId , callback){
		data.loadOne_event(eventId , function(data){
			callback(data);
		});
	}

	this.del_interval = function (eventId , intervalId , callback){
		data.del_interval(eventId , intervalId , function(){
			callback();
		});
	}

	this.delete_event = function (eventId , callback){
		data.del_event(eventId , function(){
			callback();
		});
	}

	this.add_interval = function (eventId , interval , callback){
		data.add_interval(eventId , interval , function(){
			callback();
		});
	}

	this.sendEmail = function(eventId , callback){
		data.loadOne_event(eventId , function(data){
			  for(var i=0;i<data.invited_users.length;i++){
				server.send({
				text:    "This email is sent to inform you about event:" + data.title,
				from:    "admin<fatemehz.gharayimanesh@gmail.com>",
				to:      data.invited_users[i],
				subject: "testing emailjs"
				}, function(err, message) { console.log(err || message); });
			  }
		  callback(data);

		});
	}

	this.reserveRoom = function(univ, eventId, callback){
		data.loadOne_event(eventId , function(err, ev){
			var room = univ.findRoomForEvent(ev,callback);
			return callback(room);
		});
	}
}