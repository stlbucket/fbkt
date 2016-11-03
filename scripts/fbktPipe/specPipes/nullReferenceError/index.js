"use strict";
const fbkt = require('../../../../fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:          'nullReferenceError',
		filename:      __filename,
		pipelineParams:	{
		},
		expectedParams:	{
		},
		pipelineSteps: {
			testMethodError: function (callInfo) {
				var x = callInfo.thisWillNotExist.thing;
				return x;
			}
		},
	}, callInfo);
};