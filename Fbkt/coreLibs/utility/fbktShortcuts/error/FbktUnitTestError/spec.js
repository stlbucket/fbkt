"use strict";
var uuid = require('node-uuid');
var util = require('util');
var _ = require('lodash');
var should = require('should');

var fbkt = require('../../../../../../Fbkt');

var target = require('./index');

describe(__filename, function () {
	var testId = uuid.v4();
	var workspace = {};


	it('create a new FbktUnitTestError', function (done) {
		var callInfo = {
			user:	{
				email:	'who@cares.com'
			},
			params: {
				whatevs:	'yo'
			}
		};
		
		var actual = target(callInfo);
		// fbkt().clog('ACTUAL', actual);
		_.isError(actual).should.be.ok;
		actual.name.should.equal('FbktUnitTestError');
		
		done();
	});
});