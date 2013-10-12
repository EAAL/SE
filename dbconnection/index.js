var mongojs= require('mongojs')
var config=require('./config')
var db=mongojs(config.dbname)
module.exports=db

