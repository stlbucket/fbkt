"use strict";
var when = require('when');
var fs = require('fs');
var mkdirp = require('mkdirp');

var fbkt = require('../../../../../Fbkt');

var createDirectory = function(options){
	var d = when.defer();
	
	var fileName = options.fileName.split('\\').join('/');
	
	var split = fileName.split('/');
	// fbkt().clog('FILE NAME SPLIT', split);
	split.splice(split.length-1, 1);
	var directory = split.join('/');

	// fbkt().clog('CREATING DIRECTORY', directory);
	mkdirp(directory, function(err){
		if (err){ 
			console.log('MKDIRP ERROR', err);
			d.reject(err); 
		}
		d.resolve();
	});
	return d.promise;
};

var writeFile = function(options){
	var d = when.defer();

	fs.writeFile(
		options.fileName
		,options.fileContents
		,{
			encoding: 'utf-8',
			flags:		'w'
		}
		,function(err, data) {
			// console.log('FILE WRITTEN', data, options.fileName);
			if (err) {
				console.trace('FILE WRITE ERROR', err);
				d.reject(err);
			}
			d.resolve('FILE WRITTEN: '+options.fileName);
		}
	);

	return d.promise;
};

module.exports = function(options){
	return createDirectory(options)
		.then(function(){
			return writeFile(options);
		});
};
