"use strict";
const R = require('ramda');
const fbkt = require('../../../../Fbkt');
const findAllUnitTests = require('./findAllUnitTests');
const executeUnitTest = require('../executeUnitTest');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'runAllUnitTests',
		filename:       __filename,
		expectedParams: {
			libRelativePath: 'string'
		},
		pipelineParams: {
			allTests: 'findAllUnitTests'
		},
		pipelineSteps: {  // any number of functions
			"findAllUnitTests":    (callInfo)=>{
				return findAllUnitTests(callInfo);
			},
			"executeTests": function (callInfo) {
				return executeUnitTest(callInfo.params.allTests);
			}
		}
	}, callInfo);
};
