var mongojs = require('mongojs')
//var config = require('./config')
var db = mongojs('SE' , ['users' , 'events']);
module.exports = db

