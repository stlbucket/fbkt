"use strict";
var R = require('ramda');
var util = require('util');

var clogFilter = require.main.require('./clogFilter');


module.exports = function(section, logItem, verbose){
	const matchedFilter = R.find((filter)=>{
		return section.indexOf(filter) > -1;
	}, clogFilter.searchFor);

	const matchedExclusion = R.find((filter)=>{
		return section.indexOf(filter) > -1;
	}, clogFilter.exclude);

	if ((clogFilter.searchFor[0] === 'ALL' && R.is(String, matchedExclusion) === false) || R.is(String, matchedFilter)){
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
	}
};