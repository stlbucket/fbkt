"use strict";
var fbkt = require('../../../../../Fbkt');


module.exports = function(sourceFilename, targetFilename){
	return fbkt().file.readFileWithPromise(sourceFilename)
		.then(function(sourceData){
			return fbkt().file.writeFileWithPromise({
				fileName:	targetFilename,
				fileContents:	sourceData
			});
		});
};