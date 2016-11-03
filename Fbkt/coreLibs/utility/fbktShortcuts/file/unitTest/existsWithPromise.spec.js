"use strict";
var uuid = require('node-uuid');
var util = require('util');
var _ = require('lodash');
var should = require('should');

var fbkt = require('../../../../../../Fbkt');

var existsWithPromise = require('../existsWithPromise');

describe(__filename, function () {
	var testId = uuid.v4();
	var workspace = {};

	it('find a file', function (done) {
		existsWithPromise('scripts/core/utility/fbktShortcuts/file/index.js')
			.then(function (result) {
				// fbkt().clog('EXISTS WITH PROMISE RESULT', result);
				done();
			})
	});

	it('identify a missing file', function (done) {
		existsWithPromise('scripts/thisFileShouldNeverExist.crap')
			.then(function (result) {
				// fbkt().clog('EXISTS WITH PROMISE RESULT', result);
				done();
			})
	});

});
