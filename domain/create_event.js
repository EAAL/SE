var data= require("../data_access/save")
module.exports = new function () {
	this.create = function (dates, invited){
		var event ={}
		event.dates=dates
		event.invited=invited
		data.saveEvent(event)
	}
}
