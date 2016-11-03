"use strict";
const fbkt = require('../../../../../../Fbkt');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'isItReallyFunctional',
		filename:       __filename,
		expectedParams: {
			isItFunctional: 'string'
		},
		pipelineSteps:  {  // any number of functions
			isItReallyFunctional: function (callInfo) {
				return callInfo.params.isItFunctional === 'close enough for javascript work!'
			}
		}
	}, callInfo)
};

