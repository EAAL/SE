
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


function require_login(req, res, next) {
    //if (req.isAuthenticated()) {
        return next();
    //}
    //res.redirect('/login')
}

var routes = require("./routes");

for (var key in routes) {
	var v = routes[key];
	if (v.authenticated) {
		app[v.method](key, require_login, v.action);
	}else {
		app[v.method](key, v.action);
	}
}
app.get('/:username', function (req, res) {
	res.send(req.params.username);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

