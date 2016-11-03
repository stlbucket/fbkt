"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const oneStepPipe = require('./index');

describe(__filename, function() {
	
	it('throwCustomError pipe', function (done) {
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
				done(result);
			})
			.catch((error)=>{
				// fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
				error.name.indexOf('Error').should.equal(0);
				done();
			});
		
	});


});