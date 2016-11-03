"use strict";
var uuid = require('node-uuid');
var util = require('util');
var _ = require('lodash');
var should = require('should');

var fbkt = require('../../../../../Fbkt');

describe(__filename, function () {
	var testId = uuid.v4();
	var workspace = {};
	
	var testString = [
		'here is a string',
		'with self.callInfo.params.one = 3;',
		'with self.callInfo.params.meh = 3;',
		'with self.callInfo.params.tacos.casa = 3;',
		'and stuff = self.callInfo.params.two;'
	].join('\n');
	
	var theRegex = /self\.callInfo\.params\.[^\s;]+/g;
	
	it('apply a regex', function (done) {
		var result = testString.match(theRegex);
		// fbkt().clog('THE RESULT', result);
		result.length.should.equal(4);
		done();
	});
});