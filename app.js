
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var domain = require('./domain/create_event');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:username', function (req, res) {
	res.send(req.params.username);
});

app.post('/create', function(req, res) {
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
});

app.get('/', function (req, res) {
	res.render('create');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
