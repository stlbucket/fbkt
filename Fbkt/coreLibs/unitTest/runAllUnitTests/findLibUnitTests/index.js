"use strict";
var R = require('ramda');
var fbkt = require('../../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'findLibUnitTests',
		filename:       __filename,
		expectedParams: {
			libRelativePath: 'string'
		},
		pipelineParams: {
			final: 'findLibUnitTests'
		},
		pipelineSteps:  {  // any number of functions
			findLibUnitTests: function (callInfo) {
				const ignoreFunc = function(file, stats){
					var fileSplit = file.split('.');
					return fileSplit[fileSplit.length-1] !== 'js';
				};

				return fbkt().file.recursiveReaddirWithPromise({
					params:	{
						directoryPath:	callInfo.params.libRelativePath,
					},
				})
					.then(function(allFiles){
						return allFiles.filter((file)=>{
							var split = file.split('/');
							var filenameSplit = split[split.length-1].split('.');

							return R.contains('spec', filenameSplit);
						});
					});
			}
		}
	}, callInfo);
};
