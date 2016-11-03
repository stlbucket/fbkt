"use strict";
var _ = require('lodash');
var when = require('when');
var fbkt = require('../../../../../Fbkt');
let defaultContents = require('./default');

module.exports = function () {
	return fbkt().file.existsWithPromise('./ignoreAllThis/currentUnitTest.js')
		.then(function (fileExists) {
			if (fileExists) {
				return when('Current unit test file already exists.');
			} else {

				return fbkt().file.writeFileWithPromise({
					fileName:	'./ignoreAllThis/currentUnitTest.js',
					fileContents:	defaultContents
				});
			}
		})
};