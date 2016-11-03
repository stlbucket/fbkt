"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const findLibUnitTests = require('./index');

describe(__filename, function() {
	
	it('find lib unit tests', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			libRelativePath:  "scripts/core/unitTest"
		};
		
		const pipe = findLibUnitTests();
		
		pipe.execute({
			user:			user,
			params:		params
		})
			.then(function(result) {
				// fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
				// fbkt().clog('FIND LIB UNIT TESTS RESULT', result, true);
				result.length.should.be.ok;
				done();
			});
		
	});


});