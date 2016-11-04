"use strict";
var R = require('ramda');
var util = require('util');

module.exports = function(section, logItem, verbose){
	var cloptions = {
		section:			section,
		logItem:			logItem,
		verbose:			verbose || false,
		prefix:		'~~~~~~~~~~~~',
		suffix:		'____________',
	};

	console.log(cloptions.prefix, cloptions.section, cloptions.prefix); //, cloptions.verbose ? ("IsVerbose=T") : ""
	if (cloptions.verbose === true){
		console.log(util.inspect(cloptions.logItem,false,null));
	} else {
		console.log(cloptions.logItem);
	}
	console.log(cloptions.suffix, 'END', cloptions.section, cloptions.suffix);
};