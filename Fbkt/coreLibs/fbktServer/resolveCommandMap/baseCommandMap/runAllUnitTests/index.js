"use strict";
var fbkt = require('../../../../../../Fbkt');
const R = require('ramda');

module.exports = function(){
	var testLibName = process.argv[4];
	return fbkt().libs.unitTest.runAllUnitTests({
		params:	{
			testLibName:	testLibName
		}
	});
};