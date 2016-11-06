"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../../Fbkt');

const createAgent = require('./createAgent');

module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'initRestApi.configureEndpoint.endpoint',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {
			agent:	"buildAgent"
		},
		pipelineSteps: {  // any number of functions
			"configureEndpoint": function (callInfo) {
				if (callInfo.params.disabled !== true) {
					var auth = callInfo.params.auth || fbkt().getConfigValue('defaultEntityControllerAuth', 'none');

					if (auth === 'token') {
						if (fbkt().controllerAuth && fbkt().controllerAuth.tokenAuth) {
							return fbkt().app[callInfo.params.action](
								`/api${callInfo.params.url}`,
								fbkt().controllerAuth.tokenAuth,
								createAgent(callInfo)
							);
						} else {
							throw fbkt().FbktCustomError("FbktConfigureEndpointError", "Token Auth Handler Not Available");
						}
					} else {
						return fbkt().app[callInfo.params.action](
							`/api${callInfo.params.url}`,
							createAgent(callInfo)
						);
					}
				}
			}
		}
	}, callInfo || {});
};
