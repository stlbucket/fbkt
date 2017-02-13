"use strict";
var R = require('ramda');
var util = require('util');
var colors = require('colors');

const clogColors = [
  'green',
  'yellow',
];

let _curColor = 0;

module.exports = function(section, logItem, verbose){

  _curColor = _curColor + 1 >= clogColors.length ? 0 : _curColor + 1;

	var cloptions = {
		section:			section,
		logItem:			logItem,
		verbose:			verbose || false,
		prefix:		'~~~~~~~~~~~~',
		suffix:		'____________',
	};

	const thisColor = R.curry(colors[clogColors[_curColor]]);


	console.log(thisColor(cloptions.prefix, cloptions.section, cloptions.prefix)); //, cloptions.verbose ? ("IsVerbose=T") : ""
	if (cloptions.verbose === true){
		console.log(thisColor(util.inspect(cloptions.logItem,false,null)));
	} else {
		console.log(thisColor(cloptions.logItem));
	}
	console.log(thisColor(cloptions.suffix, 'END', cloptions.section, cloptions.suffix));
};