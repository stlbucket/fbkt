"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const oneStepPipe = require('./index');

describe(__filename, function() {
	
	it('one-step pipe', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS FUNCTION BUCKET"
		};
		
		const pipe = oneStepPipe();
		
		pipe.execute({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				// fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
				result.testId.should.equal(testId);
				done();
			});
		
	});


});