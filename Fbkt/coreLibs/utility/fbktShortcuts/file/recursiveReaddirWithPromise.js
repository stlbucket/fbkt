"use strict";
var when = require('when');
var recursiveReaddir = require('recursive-readdir');
var fs = require('fs');

var fbkt = require('../../../../../Fbkt');

module.exports = function(callInfo){
	// console.log('READING DIRECTORY', callInfo);

	var d = when.defer();

	fs.exists(callInfo.params.directoryPath, function(exists){
		if (exists){
			recursiveReaddir(callInfo.params.directoryPath,
				[callInfo.params.ignoreFunc || function(){
					return false;
				}],
				function(err, data){
					if (err) {
						console.trace('DIR READ ERROR', err);
						d.reject(err);
					} else {
						// fbkt().clog('DIRECTORY CONTENTS', data);
						d.resolve(data);
					}
				});
		} else {
			d.resolve([]);
		}
	});

	return d.promise;
};
