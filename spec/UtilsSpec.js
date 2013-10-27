Utils = require('../Utils/Utils.js');
describe("Utilities specs", function () {
	it("checks if two intervals intersect", function () {
		expect(Utils.overlap({start: 1, end: 10}, {start: 9, end: 20})).toBe(true);
	});
	it("checks if two intervals do not intersect", function () {
		expect(Utils.overlap({start: 1, end: 10}, {start: 12, end: 20})).not.toBe(true);
	});
	it("check var date" , function (){
		var date1 = new Date('25 Dec, 1995 23:15:00');
		var date2 = new Date('26 Dec, 1995 23:15:00');
	});
});
