"use strict";
const moment = require('moment');
const fbkt = require('../../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'simpleOneStepFbktPipeline',
		filename:       __filename,
		expectedParams: {
			testId: 'uuid'
		},
		pipelineParams: {
			stepOneCallTime: 'stepOne.callTime'
		},
		pipelineSteps:  {  // any number of functions
			stepOne: function (callInfo) {
				return {
					testId:         callInfo.params.testId,
					callTime:       moment().format('mm.ss.SSSS'),
					isItFunctional: 'close enough for javascript work!'
				};
			}
		}
	}, callInfo);
};