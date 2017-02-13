"use strict";
var R = require('ramda');
var util = require('util');
var colors = require('colors');

const clogColors = [
  'green',
  'cyan',
];

let _curColor = 0;

module.exports = function(sectionIdentifier, logItem, verbose, color){
  let useColor = color;

  if (R.isNil(useColor)) {
    _curColor = _curColor + 1 >= clogColors.length ? 0 : _curColor + 1;
    useColor = clogColors[_curColor];
  }

	var cloptions = {
		sectionIdentifier:			sectionIdentifier,
		logItem:			logItem,
		verbose:			verbose || false,
		prefix:		'~~~~~~~~~~~~',
		suffix:		'____________',
	};

	const thisColor = R.curry(colors[useColor]);

  const header = thisColor(cloptions.prefix, cloptions.sectionIdentifier, cloptions.prefix);
  const message = cloptions.verbose === true ? thisColor(util.inspect(cloptions.logItem, false, null)) : thisColor(cloptions.logItem);
  const footer = thisColor(cloptions.suffix, 'END', cloptions.sectionIdentifier, cloptions.suffix);

  console.log(`
${header}
${message}
${footer}
`);
};