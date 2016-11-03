"use strict";
const fbkt = require('../../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:          'throwCustomError',
		filename:      __filename,
		pipelineSteps: {
			throwCustomError: function (callInfo) {
				throw fbkt().FbktCustomError('FbktCustomUnitTestError_' + callInfo.params.testId, {
					testId: callInfo.params.testId,
				});
			}
		}
	}, callInfo);
};