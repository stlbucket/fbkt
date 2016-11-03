"use strict";
var fbkt = require('../../../../../Fbkt');
var should = require('should');
var _ = require('lodash');
var uuid = require('node-uuid');

var FbktUnitTestError = require('./FbktUnitTestError');

describe(__filename, function(){
	it('consume a generic error', function(done){
		var testId = uuid.v4();
		
		fbkt().error({
			source:		'TEST SOURCE',
			error:		new Error(testId),
			logCategory:	'unitTestLogCategory',
			callInfo:		{
				user:	{ name: 'test user' },
				params:	{
					id:			1,
					data:	'test data'
				}
			}
		})
			.then(function(fbktErrorResult){
				// fbkt().clog('FBKT ERROR RESULT', fbktErrorResult, true);
				fbktErrorResult.should.be.ok;
				_.isError(fbktErrorResult).should.be.ok;
				fbktErrorResult.name.should.equal('FbktError');
				fbktErrorResult.logEntry.source.should.equal('TEST SOURCE');
				fbktErrorResult.logEntry.message.should.equal(new Error(testId).toString());
				fbktErrorResult.logEntry.logCategory.should.equal('unitTestLogCategory');
				fbktErrorResult.logEntry.attributesJson.stack.length.should.be.ok;
				done();
			});
	});

	it('consume a unit test error', function(done){
		var testId = uuid.v4();

		fbkt().error({
			source:		'TEST SOURCE',
			error:		FbktUnitTestError(testId),
			logCategory:	'unitTestLogCategory',
			callInfo:		{
				user:	{ name: 'test user' },
				params:	{
					id:			1,
					data:	'test data'
				}
			}
		})
			.then(function(fbktErrorResult){
				// fbkt().clog('FBKT ERROR RESULT', fbktErrorResult, true);
				fbktErrorResult.should.be.ok;
				_.isError(fbktErrorResult).should.be.ok;
				fbktErrorResult.name.should.equal('FbktUnitTestError');
				fbktErrorResult.logEntry.source.should.equal('TEST SOURCE');
				// fbktErrorResult.logEntry.message.should.equal(new Error(testId).toString());
				fbktErrorResult.logEntry.logCategory.should.equal('unitTestLogCategory');
				fbktErrorResult.logEntry.attributesJson.stack.length.should.be.ok;
				done();
			});
	});
});