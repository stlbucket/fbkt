"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const throwErrorMixedPipe = require('./index');

describe(__filename, function() {
	
	it('throw error mixed pipe', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			testId: testId,
			input:  "THIS IS FUNCTION BUCKET"
		};
		
		throwErrorMixedPipe({
			user:			user,
			params:		params,
			recordPipe:	true
		})
			.then(function(result) {
				done(result);
			})
			.catch((expectAnError)=>{
				// fbkt().clog('THROW ERROR MIXED PIPE EXPECTED AN ERROR', expectAnError, true);
				expectAnError.name.indexOf('Fbkt').should.equal(0);
				done();
			});
		
	});


});