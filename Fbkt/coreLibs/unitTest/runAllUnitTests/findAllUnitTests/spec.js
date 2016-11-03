"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const findAllUnitTests = require('./index');

describe(__filename, function() {
	
	it('findAllUnitTests', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: 					testId,
			libRelativePath:  "scripts/core/unitTest"
		};

		findAllUnitTests({
			user:			user,
			params:		params
		})
			.then(function(result) {
				// fbkt().clog('FIND ALL UNIT TESTS RESULT', result, true);
				done();
			});
		
	});


});