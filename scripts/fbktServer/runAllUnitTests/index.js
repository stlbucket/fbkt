"use strict";
var fbkt = require('../../../fbkt');

module.exports = function(){
	var testLibName = process.argv[4];

	return fbkt().libs.unitTest.runAllUnitTests({
		params:	{
			testLibName:	testLibName
		}
	});
};