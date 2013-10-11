
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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

var routes = {
	'/': {
		method: 'get',
		func: function (req, res) {

		}
	},
	'/asd': {
		method: 'post',
		func: function (req, res) {

		}
	}
}


for (var f in routes) {
	app[routes[f].method](f, routes[f].func);
}

app.get('/:username', function(req, res) {
	res.send(req.params.username);
});

app.post('/create', function(req, res) {
	res.send(req.body.invited + ' ' + req.body.date);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
