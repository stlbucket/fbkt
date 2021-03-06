"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../Fbkt');

const configureEndpoint = require('./configureEndpoint');
const initCustomRestControllers = require('./initCustomRestControllers');
const initGraphQL = require('./initGraphQL');
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
      "initGraphQL":                initGraphQL,
			"captureAppRoutes":						captureAppRoutes
		}
	}, callInfo || {});
};

module.exports = (callInfo)=>{
  if (fbkt().config.nodeEnv !== 'buildDb'){
		fbkt().restApiSupport =  {
			configureEndpoint: configureEndpoint,
			captureAppRoutes:	captureAppRoutes
		};
		
		return initControllers(callInfo);
	} else {
		return 'NO CONTROLLERS';
	}
};
