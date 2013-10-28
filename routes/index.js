domain = require('../domain/create_event.js');
module.exports = {
	'/create': {
		method: 'post',
		authenticated: true,
		action: function (req, res) {
			var dates=[];
			var req_dates = req.body.date.split(/[,;]/g);
			var req_invited = req.body.invited.split(/[,;]/g);

			console.log(req_dates);
			for (date in req_dates){

				var temp = {};
				var a = req_dates[date].split(" ");
				temp.time = a[1];
				temp.date = a[0];
				dates.push(temp);
			}
			domain.create(dates , req_invited);
			res.send("با موفقیت ثبت شد");
		}
	},
	'/admin': {
		method : 'get',
		authenticated: false, 
		action: function (req, res){
			console.log("man injam\n");
			res.render('admin');
		}
	},
	'/': {
		method: 'get',
		authenticated: false,
		action: function (req, res) {
			res.render('create');
		}
	},
	'/finishcall':{
		method: 'get',
		authenticated: false,
		action: function (req, res){
			res.render('finishcall');
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