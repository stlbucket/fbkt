"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../Fbkt');

const initCustomRestControllers = require('./initCustomRestControllers');
const captureAppRoutes = require('./captureAppRoutes');

const initControllers = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'restApi.initRestApi',
		filename:       __filename,
		expectedParams: {
		},
		pipelineParams: {
		},
		pipelineSteps: {  // any number of functions
			"initCustomRestControllers":	initCustomRestControllers,
			"captureAppRoutes":						captureAppRoutes
		}
	}, callInfo || {});
};

module.exports = (callInfo)=>{
	if (fbkt().executionMode !== 'BUILD_DB'){
		return initControllers(callInfo);
	} else {
		return 'NO CONTROLLERS';
	}
};
