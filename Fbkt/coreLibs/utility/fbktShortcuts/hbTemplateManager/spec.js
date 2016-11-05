"use strict";
var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');

const pipeDef = require('./index');

describe(__filename, function() {
	
	it('find lib unit tests', function (done) {
		const testId = uuid.v4();
		const user ={ login:	"who@cares.com" };
		const	params = {
			templateFilePath:		`${__dirname}/specSupport/template.hbs`,
			templateData:	{
				testData:			testId,
			},
			executionMode:	"REPORTIT"
		};
		
		const pipe = pipeDef();
		
		pipe.execute({
			user:			user,
			params:		params
		})
			.then(function(result) {
				// fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
				// fbkt().clog('HB TEMPLATE MANAGER TEST RESULT', result, true);
				done();
			})
			.catch(function(error){
				// fbkt().clog('FUNCTION BUCKET WORKSPACE', pipe.ws, true);
				// fbkt().clog('HB TEMPLATE MANAGER TEST ERROR', error, true);
				done(error);
			});
		
	});


});