
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var User = require('./domain/User');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var DB = require('./dbconnection');
var passport = require('passport') , 
	GoogleStrategy = require('passport-google').Strategy;

ejs.close = '}}';
ejs.open = '{{';

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/folan',
    realm: 'http://localhost:3000'
  },
  function(identifier, profile, done) {
	DB.users.findOne({'email': profile.emails[0].value } , function (err , user){
		console.log(user);
		if(user == null){
			var new_user = new User();
			new_user.email = profile.emails[0].value;
			DB.users.save(new_user);
  		}
  	});
	done(null , profile);
  }
));

passport.serializeUser(function(user, done) {
	done(null, user.emails[0].value);
});

passport.deserializeUser(function(email, done) {
	DB.users.findOne({email: email}, function (err, user) {
		done(err, user);
	});
});

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
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


function require_login(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/auth/google');
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

app.get('/auth/google', passport.authenticate('google'));

app.get('/folan', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

