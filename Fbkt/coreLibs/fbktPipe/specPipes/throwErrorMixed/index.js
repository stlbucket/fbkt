"use strict";
const fbkt = require('../../../../../Fbkt');
const oneStep = require('../oneStep');
const throwCustomError = require('../throwCustomError');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:				'throwErrorMixed',
		filename: __filename,
		pipelineParams:	{
		},
		expectedParams:	{
			testId:					'uuid'  // not yet applied
		},
		pipelineSteps: {
			oneStep:							oneStep(),
			throwCustomError:			throwCustomError()
		}
	}, callInfo);
};
