"use strict";
const fbkt = require('../../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'initConfig',
		filename:       __filename,
		expectedParams: {
			testId: 'uuid'
		},
		pipelineParams: {
		},
		pipelineSteps:  {  // any number of functions
			initConfig: function (callInfo) {
				console.log('initConfig');
			}
		}
	}, callInfo);
};
