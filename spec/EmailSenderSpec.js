EmailSender = require('../Utils/EmailSender.js');
describe("Email Sender specs", function () {
	it("should load from config file", function () {
		var temp = new EmailSender();
		expect(temp.emailData.username).toEqual('test');
		expect(temp.emailData.password).toEqual('test');
	});
});
