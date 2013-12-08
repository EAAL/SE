var data = require("../data_access/save.js");
var db = require('../dbconnection');
var Event = require('../domain/Event.js');
var when = require('when');
module.exports = new function () {
	this.create = function (owner , intervals, invited , deadLine , policy){
		var new_event = new Event();
		new_event.owner = owner;
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
			return callback (votes);
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
	}
}