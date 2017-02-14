"use strict";
const fbkt = require('../../../../../../Fbkt');
const R = require('ramda');
const args = require('minimist')(process.argv.slice(2));

module.exports = function(){
  var testLibName = args.testLib;

  return fbkt().libs.unitTest.runAllUnitTests({
		params:	{
			testLibName:	testLibName
		}
	});
};