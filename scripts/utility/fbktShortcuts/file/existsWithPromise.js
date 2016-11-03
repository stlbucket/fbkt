"use strict";
var when = require('when');
var fs = require('fs');


module.exports = function(filePath){
	// console.log('checking for existence of file', filePath);

	var d = when.defer();

	fs.stat(filePath, function(err, data){
		if (err) {
			if (err.code === 'ENOENT'){
				d.resolve(false);
			} else {
				console.trace('FILE EXISTS ERROR', err);
				d.reject(err);
			}
		}
		d.resolve(true);
	});

	return d.promise;
};
