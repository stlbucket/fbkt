"use strict";
var when = require('when');
var Mocha = require('mocha');

var fbkt = require('../../../../Fbkt');
var executeTest = require('../executeUnitTest');
var createDefaultCurrentUnitTestFile = require('./createDefaultCurrentUnitTestFile');

module.exports = function(){
	return createDefaultCurrentUnitTestFile()
		.then(function(){
			try {
				var currentUnitTest = require(process.cwd()+'/ignoreAllThis/currentUnitTest.js');
			} catch (e) {
				throw e;
			}

			return executeTest(currentUnitTest);
		})
		.then(function(failures){
			fbkt().clog('TESTING FAILURES', failures);
		})
		.catch(function(error){
			fbkt().clog('TESTING COMPLETE', 'SEE ERROR REPORT', error);
		});
};