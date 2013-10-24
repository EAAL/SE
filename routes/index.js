domain = require('../domain/create_event.js');
module.exports = {
	'/create': {
		method: 'post',
		authenticated: true,
		action: function (req, res) {
			var dates=[];
			//var invited[];
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
	'/': {
		method: 'get',
		authenticated: false,
		action: function (req, res) {
			res.render('create');
		}
	}
}