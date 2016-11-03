"use strict";
var when = require('when');
var _ = require('lodash');
var Mocha = require('mocha');

var fbkt = require('../../../../Fbkt');

module.exports = function(suite){
	if (Array.isArray(suite) === false){
		suite = [
			suite
		];
	};
	
	var d = when.defer();

	var mocha = new Mocha();
	_.forEach(suite, function(fileName){
		mocha.addFile(fileName);	
	});

	try {
		mocha.run(function(failures){
			d.resolve(failures);
		});
	} catch (err){
		fbkt().clog('UNCAUGHT MOCHA ERROR', err);
		fbkt().clog('UNCAUGHT MOCHA ERROR STACK', err.stack);
		d.reject(err);
	}

	return d.promise;
};
