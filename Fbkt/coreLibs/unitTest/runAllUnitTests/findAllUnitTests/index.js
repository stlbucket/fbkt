"use strict";
var R = require('ramda');
var Promise = require('bluebird');
var fbkt = require('../../../../../Fbkt');
var findLibUnitTests = require('../findLibUnitTests');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'findAllUnitTests',
		filename:       __filename,
		pipelineSteps: {  // any number of functions
			"findAllUnitTests": function (callInfo) {
				const libs = fbkt().libs;
				let libUnitTestSets = [];
				R.forEach((lib)=>{
					const libRelativePath = R.is(Function, libs[lib].libRelativePath) ? libs[lib].libRelativePath() : null;
					const ignoreLib = R.is(String, callInfo.params.testLibName) && (lib !== callInfo.params.testLibName);
					if (libRelativePath && !ignoreLib) {
						libUnitTestSets.push(findLibUnitTests().execute({
							params: {
								libRelativePath: libRelativePath
							}
						}));
					}
			}, R.keys(libs));

				return Promise.reduce(libUnitTestSets, function(all, utSet){
					return R.concat(all, utSet);
				}, []);

			}
		}
	}, callInfo);
};
