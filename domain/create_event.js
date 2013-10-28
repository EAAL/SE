var data = require("../data_access/save.js")
var data_load = require("../data_access/load.js")
module.exports = new function () {
	this.create = function (dates, invited , deadLine){
		var event ={}
		event.dates=dates
		event.invited=invited
		data.saveEvent(event)
	},
	this.load = function (id){
		return data_load.loadEventInterval(id);
	}
}
