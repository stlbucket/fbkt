"use strict";
var uuid = require('node-uuid');
var util = require('util');
var should = require('should');
var _ = require('lodash');

var fbkt = require('../../../../../Fbkt');

describe(__filename, function () {
	var testId = uuid.v4();
	var workspace = {};

	it('recursive read directory contents', function (done) {
		fbkt().file.recursiveReaddirWithPromise({
			params:	{
				directoryPath:	__dirname
			}
		})
			.then(function(directoryContents){
				// fbkt().clog('READ DIR WITH PROMISE RESULT', directoryContents);
				directoryContents.should.be.ok;
				_.isString(directoryContents[0]).should.be.ok;
				done();
			})
			.catch(function(error){
				done(error);
			});
	});
	
	it('recursive read directory contents but ignore .js files', function (done) {
		fbkt().file.recursiveReaddirWithPromise({
				params:	{
					directoryPath:	__dirname,
					ignoreFunc:		function(file, stats){
						var fileSplit = file.split('.');
						return fileSplit[fileSplit.length-1] === 'js';
					}
				}
			})
			.then(function(directoryContents){
				// fbkt().clog('READ DIR WITH PROMISE RESULT', directoryContents);
				directoryContents.should.be.ok;
				directoryContents.length.should.equal(1);
				done();
			})
			.catch(function(error){
				done(error);
			});
	});
});