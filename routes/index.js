domain = require('../domain/core_domain.js');
Interval = require ('../domain/Interval.js');
Uni = require('../domain/University.js');
var calendar = require('../Utils/calendar.js');
Agenda = require("agenda");
var agenda = new Agenda({db: { address: 'localhost:27017/SE'}});
var when = require('when');

module.exports = {
	'/create_auth': {
		method: 'post',
		authenticated: true,
		action: function (req, res) {
			var dates = [];
			var req_dates = req.body.dates.split(/[,;]/g);
			var req_invited = req.body.invited.split(/[,;]/g);

			console.log(req.body);
			/*----------------------------------------------*/
			var dead_line_date = req.body.end_vote_date;
			var temp_date = dead_line_date.split('/');
			var dead_line_time = req.body.end_vote_time;
			var temp_time = dead_line_time.split(':');

			var time_number = calendar.persian_to_jd(temp_date[2]/1 , temp_date[1]/1 , temp_date[0]/1);
			var miladi = calendar.jd_to_gregorian(time_number);
			var dead_line = new Date(miladi[0]/1 , (miladi[1] / 1) - 1 , miladi[2]/1 , temp_time[0]/1 , temp_time[1]/1);
			console.log(dead_line);
			/*----------------------------------------------*/
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
			domain.create(req.body.title , req.user , dates , req_invited , dead_line , policy , function (id){
				var job = agenda.schedule(dead_line.toString(), 'run room assignment', {eventId : id});
				job.save(function (err) {
					if (err)
						console.log("Could not save job in database!");
					else{
						console.log("Job successfully saved!");
						console.log(dead_line);
					}
				});
				setTimeout(function(){
					job.run();
				} , (dead_line - Date.now()));
				res.redirect('/success');
			});
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
			domain.user_load(req.user.email , function (err , data){
				if (data == null){
					res.render( 'show_event' , {err : false , no_event : true});
				}
				else{
					res.render( 'show_event' , {events : data , err : false , no_event : false });
				}
			});
		}
	},
	'/show_votes' : {
		method : 'get',
		authenticated : true,
		action : function (req , res){
			domain.event_load(req.user.email , req.query.eventId , function (data , title){
				res.render('vote' , {votes : data , id : req.query.eventId , title: title});
			});
		}
	},
	'/save_vote': {
		method : 'post',
		authenticated : true,
		action : function (req , res){
			var id = parseInt(req.body.eventId , 10);
			var votes = [];
			for(v in  req.body){
				//if (req.body[v] === 'yes' || req.body[v] === 'no' || req.body[v] === 'maybe'){
				if (v.indexOf('numb') === 0) {
					var temp = {};
					temp.interval_id = v.substring(4)/1;
					temp.id = req.user.email;
					temp.value = req.body[v];
					votes.push(temp);
				}
			}
			domain.save_votes(votes , id , function (){
				res.redirect('/success');
			});
		}
	},
	'/delete_vote': {
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
	'/success': {
		method : 'get',
		authenticated : true,
		action: function (req , res){
			res.render('success' , {email : req.user.email , auth : true});
		}
	},
	'/me': {
		method : 'get',
		authenticated : true,
		action: function (req , res){
			res.render('me' , {auth : true});
		}
	},
	'/owner_event':{
		method : 'get',
		authenticated : true,
		action: function (req , res){
			domain.owner_events(req.user.email , function (data){
				res.render('event_list' , {events : data});
			});
		}
	},
	'/show_event':{
		method : 'get',
		authenticated : true,
		action: function (req , res) {
			domain.loadOne_event((req.query.eventId / 1) , function (err , data){
				res.render('edit_event' , {event : data});
			});
		}
	},
	'/edit_event':{
		method : 'post',
		authenticated : true,
		action: function (req , res){
			if(req.body.type == 'del_interval'){
				domain.del_interval(req.body.eventId/1 , req.body.intervalId/1 , function(){
					res.send(".با موفقیت انجام شد");
				});
			}else if(req.body.type == 'add_interval'){
				var new_interval = new Interval();
				new_interval.date = req.body.date;
				new_interval.startTime = req.body.startTime;
				new_interval.endTime = req.body.endTime;
				domain.add_interval(req.body.eventId/1 , new_interval , function(){
					res.send(".با موفقیت انجام شد");
				});
			}else if(req.body.type == 'del_event'){
				domain.delete_event(req.body.eventId/1 , function(){
					res.send("happy for you");
				});
			}
		}
	},
	'/end/getaRoom': {
		method: 'get',
		authenticated: false,
		action: function (req , res) {
			var id = parseInt(req.query.eventId , 10);
			var univ = new Uni();
			domain.reserveRoom(univ, req.query.eventId/1, function (data) {
			    console.log(data);
			    res.send('khar'+data);
			    return data;
			});
		}
	},
	'/end/email': {
		method: 'get',
		authenticated: false,
		action: function (req, res){
			var id = parseInt(req.query.eventId , 10);
			domain.sendEmail(id,function(){
			      res.send("sent.");
			});
		}
	},
	'/admin': {
		method: 'get',
		authenticated: true,
		action: function (req, res, next) {
			if(req.user.email == 'mohammad.nsr@gmail.com') {
				res.render('admin');
			}
			else
				return res.send("Authentication Failed!");
		}
	},
	'/': {
		method : 'get' , 
		authenticated : false , 
		action : function (req , res){
			agenda.define('run room assignment', function(job, done) {
				var id = job.attrs.data.eventId;
				var univ = new Uni();
				domain.reserveRoom(univ, id/1, function (data) {
				    console.log(data);
				    res.send('khar');
				    return data;
				});
			});
			if(req.isAuthenticated()){
				res.render('home' , {email : req.user.email , auth : true});
			}
			else{
				res.render('home' , {email : null , auth : false});
			}
		}
	},
	'/about' : {
		method : 'get' ,
		authenticated : false , 
		action : function (req , res){
			if(req.isAuthenticated()){
				res.render('about' , {email : req.user.email , auth : true});
			}
			else{
				res.render('about' , {email : null , auth : false});
			}
		}
	}
}