var email = require("emailjs");
var Class = require("./Class.js")
var EmailSender = Class.extend({
	constructor: function () {
		fs = require('fs');
		this.emailData = require('../../../email.json');
		this.server = email.server.connect({
		   user:    this.emailData.username,
		   password:this.emailData.password,
		   host:    "smtp.gmail.com", 
		   ssl:     true

		});
	},
	sendEmail: function (toEmails, ccEmails, mailSubject, mailContent) {
		this.server.send({
		   text:    mailContent, 
		   from:    "Khafans", 
		   to:      toEmails,
		   cc:      ccEmails,
		   subject: mailSubject
		}, function(err, message) { console.log(err || message); });
	}
});
module.exports = EmailSender;