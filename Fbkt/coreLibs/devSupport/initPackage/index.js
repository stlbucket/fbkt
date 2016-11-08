"use strict";
const fbkt = require('../../../../Fbkt');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'initializePackage',
		filename:       __filename,
		expectedParams: {
			testId: 'uuid'
		},
		pipelineParams: {
		},
		pipelineSteps:  {  // any number of functions
			initializePackage: function (callInfo) {
        console.log('initializePackage');
        process.exit();
			}
		}
	}, callInfo);
};
