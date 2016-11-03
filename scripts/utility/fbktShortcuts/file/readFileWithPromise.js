"use strict";
var when = require('when');
var fs = require('fs');


module.exports = function(filePath){
	//console.log('READING FILE', filePath);
	
	var d = when.defer();

	fs.readFile(filePath,'utf-8', function(err, data){
		if (err) {
			console.trace('FILE READ ERROR', err);
			d.reject(err);
		}
		d.resolve(data);
	});

	return d.promise;
};
