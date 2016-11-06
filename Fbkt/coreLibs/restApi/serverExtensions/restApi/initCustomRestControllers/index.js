
"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../Fbkt');

const configureGetAllEndpoint = require('../configureEndpoint/getAll');
const configureGetOneEndpoint = require('../configureEndpoint/getOne');
const configurePostEndpoint = require('../configureEndpoint/post');
const configurePutEndpoint = require('../configureEndpoint/put');
const configureDeleteEndpoint = require('../configureEndpoint/delete');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:           'restApi.initRestApi.initCustomRestControllers',
		filename:       __filename,
		expectedParams: {
		},
		pipelineParams: {
		},
		pipelineSteps: {  // any number of functions
			"initCustomRestControllers":	(callInfo)=>{
				const customRestControllers = fbkt().getComponentFromAllLibs('customRestControllers');
				// fbkt().clog("customRestControllers", customRestControllers); process.exit();

				return Promise.mapSeries(
					customRestControllers,
					(controller)=> {
						if (controller.restEndpoints.getAll) {
							configureGetAllEndpoint({
								params: {
									url: 			controller.url,
									auth:     controller.restEndpoints.getAll.auth,
									handler:  controller.restEndpoints.getAll.handler,
								}
							});
						}

						if (controller.restEndpoints.getOne){
							configureGetOneEndpoint({
								params:		{
									url: 			controller.url,
									auth:			controller.restEndpoints.getOne.auth,
									handler:	controller.restEndpoints.getOne.handler
								}
							});
						}

						if (controller.restEndpoints.post){
							configurePostEndpoint({
								params:		{
									url: 			controller.url,
									auth:			controller.restEndpoints.post.auth,
									handler:	controller.restEndpoints.post.handler
								}
							});
						}

						if (controller.restEndpoints.put){
							configurePutEndpoint({
								params:		{
									url: 			controller.url,
									auth:			controller.restEndpoints.put.auth,
									handler:	controller.restEndpoints.put.handler
								}
							});
						}

						if (controller.restEndpoints.delete){
							configureDeleteEndpoint({
								params:		{
									url: 			controller.url,
									auth:			controller.restEndpoints.delete.auth,
									handler:	controller.restEndpoints.delete.handler
								}
							});
						}
					}
				);
			}
		}
	}, callInfo || {});
};
