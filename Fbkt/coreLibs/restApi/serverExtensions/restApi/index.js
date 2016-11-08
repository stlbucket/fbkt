"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../Fbkt');

const configureEndpoint = require('./configureEndpoint');
const initCustomRestControllers = require('./initCustomRestControllers');
const captureAppRoutes = require('./captureAppRoutes');

const initControllers = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'restApi',
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
	if (process.env.NODE_ENV !== 'BUILD_DB'){
		fbkt().restApiSupport =  {
			configureEndpoint: configureEndpoint,
			captureAppRoutes:	captureAppRoutes
		};
		
		return initControllers(callInfo);
	} else {
		return 'NO CONTROLLERS';
	}
};
