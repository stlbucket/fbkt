"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../../Fbkt');

const configureEndpoint = require('../endpoint');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'initRestApi.configureEndpoint.getOne',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {  // any number of functions
			"configureEndpoint":	function(callInfo){
				const handler = callInfo.params.handler;

				// if (handler === undefined) {
				// 	console.trace('initRestApi.configureEndpoint.getOne - NO HANDLER', callInfo.params);
				// 	process.exit();
				// }
				
				return configureEndpoint({
					params: {
						auth:		 callInfo.params.auth,
						handler: handler,
						action:  'get',
						url:     `${callInfo.params.url}/:id`
					}
				});
			}
		}
	}, callInfo || {});
};