"use strict";
const fbkt = require('../../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:          'throwJsError',
		filename:      __filename,
		pipelineSteps: {
			throwJsError: function (callInfo) {
				throw new Error(`UnitTest Error - ${callInfo.params.testId}`);
			}
		}
	}, callInfo);
};