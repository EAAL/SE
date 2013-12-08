domain = require('../domain/create_event.js');
Interval = require ('../domain/Interval.js');
var when = require('when');

module.exports = {
	'/' : {
		method : 'get' , 
		authenticated : false , 
		action : function (req , res){
			if(req.isAuthenticated()){
				res.render('home' , {email : req.user.email , auth : true});
			}
			else{
				res.render('home' , {email : null , auth : false});
			}
		}
	},
	'/create_auth': {
		method: 'post',
		authenticated: true,
		action: function (req, res) {
			var dates = [];
			var req_dates = req.body.date.split(/[,;]/g);
			var req_invited = req.body.invited.split(/[,;]/g);
			var dead_line = req.body.deadline;
			var policy = req.body.numb;
			console.log(req.body.numb);
			var interval_id = 1;
			for (date in req_dates){
				var temp = new Interval();
				var a = req_dates[date].split(" ");
				temp.startTime = a[1].split("-")[0];
				temp.endTime = a[1].split("-")[1];
				temp.date = a[0];
				temp.id = interval_id;
				dates.push(temp);
				interval_id += 1;
			}
			domain.create(req.user , dates , req_invited , dead_line , policy);
			res.send("با موفقیت ثبت شد");
		}
	},
	'/create' : {
		method: 'get',
		authenticated : true,
		action: function (req,res){
			res.render('create');
		}
	},
	'/showevents' : {
		method : 'get',
		authenticated : true,
		action : function (req, res){
			console.log("salam");
			console.log(req.user.email);
			domain.user_load(req.user.email , function (err , data){
				console.log('after finding the obj form database');
				console.log(data);
				if (data.eventIds == null){
					res.render( 'show_event' , {err : false , no_event : true});
				}
				else{
					res.render( 'show_event' , {eventIds : data.eventIds , err : false , no_event : false });
				}
			});
		}
	},
	'/show_votes' : {
		method : 'get',
		authenticated : true,
		action : function (req , res){
			domain.event_load(req.user.email , req.query.eventId , function (data){
				res.render('vote' , {votes : data , id : req.query.eventId});
			});
		}
	},
	'/save_vote' : {
		method : 'post',
		authenticated : true,
		action : function (req , res){
			var number = 1;
			var id = parseInt(req.body.eventId , 10);
			var votes = [];
			for(v in  req.body){
				if (req.body[v] === 'yes' || req.body[v] === 'no' || req.body[v] === 'maybe'){
					var temp = {};
					temp.interval_id = number;
					temp.id = req.user.email;
					console.log(req.body[v]);
					temp.value = req.body[v];
					votes.push(temp);
					number ++ ;
				}
			}
			domain.save_votes(votes , id , function (){
				res.send('نظر مشا با موفقیت ثبت شد');
			});
		}
	},
	'/delete_vote':{
		method: 'post',
		authenticated: true,
		action: function (req ,res){
			console.log(req.body);
			console.log(req.user.email);
			var id = parseInt(req.body.eventId , 10);
			var interval_id = parseInt (req.body.intervalId , 10);
			domain.delete_vote(req.user.email , id , interval_id , function (err){
				if (err == null){
					res.send("ok");
				}
			});
		}
	},
	'/end/getaRoom':{
		method: 'post',
		authenticated: false,
		action: function (req , res) {
			var Uni = require('../domain/University.js');
			var univ = new Uni();
			var room_number = univ.findRoomForEvent(req.body.event_id);
			res.render('admin' , {"room_number" : room_number});
		}
	}
}