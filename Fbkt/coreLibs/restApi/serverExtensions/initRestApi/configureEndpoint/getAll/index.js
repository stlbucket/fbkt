"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../../Fbkt');

const configureEndpoint = require('../endpoint');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'initRestApi.configureEndpoint.getAll',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {  // any number of functions
			"configureEndpoint":	function(callInfo){
				return configureEndpoint({
					params: {
						auth:		 callInfo.params.auth,
						handler: callInfo.params.handler,
						action:  'get',
						url:     callInfo.params.url
					}
				});
			}
		}
	}, callInfo || {});
};