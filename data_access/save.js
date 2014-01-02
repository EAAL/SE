var db = require('../dbconnection');
var User = require ('../domain/User.js');
var Vote = require ('../domain/Vote.js');
module.exports = new function() {
	this.saveEvent = function (event){
		db.events.save(event);
	}

	this.add_user_eventId = function ( email , eventId){
		db.users.findOne({'email' : email } , function (err ,data){
			console.log(data);
			if(data == null){
				var new_user = new User();
				new_user.email = email;
				new_user.eventIds.push(eventId);
				db.users.save(new_user);
			}
			else{
				var ids = data.eventIds;
				ids.push(eventId);
				db.users.update({'email' : email} , { $set : {'eventIds' : ids}});
			}
		});
	}

	this.load_event = function (eventId , callback){
		var id = parseInt(eventId , 10);
		db.events.findOne({'eventId': id} , function (err , data){
			return callback(err,data);
		});
	}

	this.load_user = function (email , callback){
		db.users.findOne({'email' : email} , function (err , data){
			return callback(err , data);
		});
	}

	this.update_vote = function(votes , id , callback){
		db.events.findOne({'eventId' : id} , function (err , data){
			var new_intervals = data.intervals;
			for (v in votes){
				var new_vote = new Vote();
				new_vote.desc = votes[v].value;
				new_vote.user_id = votes[v].id;
				for (inter in new_intervals){
					if (new_intervals[inter].id == votes[v].interval_id){
						new_intervals[inter].votes.push(new_vote);
						break;
					}
				}
			}

			db.events.update({'eventId' : id} , { $set : {'intervals' : new_intervals}} , function(){
				return callback();
			});
		});
	}

	this.delete_vote = function (email , eventId , interval_id , callback){
		db.events.findOne({'eventId': eventId } , function (err , data){
			console.log(data);
			var new_intervals = [];

			for (inter in data.intervals){
				if (data.intervals[inter].id === interval_id){
					var new_votes = [];
					for (vote in data.intervals[inter].votes){
						if (data.intervals[inter].votes[vote].user_id === email){
							continue;
						}else{
							new_votes.push(data.intervals[inter].votes);
						}
					}
					data.intervals[inter].votes = new_votes;
					new_intervals.push(data.intervals[inter]);
				}else{
					new_intervals.push(data.intervals[inter]);
				}
			}

			console.log('save.js');
			console.log(new_intervals);

			db.events.update( {'eventId' : eventId } , { $set : {'intervals' : new_intervals} } , function (err , data){
				return callback(err);
			});
		});
	}

	this.load_all_events = function (email , callback){
		db.events.find({'owner' : email} , function (err , data){
			callback(data);
		});
	}

	this.loadOne_event = function (eventId , callback){
		db.events.findOne({'eventId' : eventId} , function (err , data){
			//console.log(data);
			var Event=require('../domain/Event.js');
			var Interval=require('../domain/Interval.js');
			var new_intervals = [];
			for(var i=0;i<data.intervals.length;i++){
				new_intervals.push(new Interval(data.intervals[i].votes,
								data.intervals[i].id,
								data.intervals[i].date,
								data.intervals[i].startTime,
								data.intervals[i].endTime));
			}
			var event = new Event(data.title,data.owner,data.dead_line,data.policy,new_intervals,
					      data.invited_users,data.nextProperIntervalIndex,data.stat,data.eventId);
			return callback(err, event);
		});
	}

	this.del_interval = function (eventId , intervalId , callback){
		db.events.findOne({'eventId': eventId} ,function (err , data){
			new_intervals = [];
			for (i in  data.intervals){
				if (data.intervals[i].id != intervalId){
					new_intervals.push(data.intervals[i]);
				}
			}
			db.events.update({'eventId' : eventId } , {$set : {'intervals' : new_intervals} } , function (err , data){
				return callback();
			});
		});
	}

	this.del_event = function (eventId , callback){
		db.events.remove({'eventId' : eventId} , function (err, data){
			callback();
		});
	}

	this.add_interval = function(eventId , interval , callback){
		db.events.findOne({'eventId' : eventId} , function (err , data){
			new_intervals = data.intervals;

			interval.id = new_intervals[new_intervals.length - 1].id + 1;
			new_intervals.push(interval);
			db.events.update({'eventId' : eventId} , { $set : {'intervals' : new_intervals } } , function (err , data){
				callback();
			});
		});
	}

	this.load_title = function (email , callback){
		db.events.find({'invited_users' : email } , function (err , data){
			return callback(err , data);
		});
	}
}
