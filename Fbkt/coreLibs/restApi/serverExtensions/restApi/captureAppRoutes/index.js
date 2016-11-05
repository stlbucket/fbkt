"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../Fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'restApi.captureAppRoutes',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			captureAppRoutes:	(callInfo)=>{
				var routes = R.map(function(stackItem){
					return {
						url:		stackItem.route ? stackItem.route.path : null,
						type:		stackItem.route ? R.keys(stackItem.route.methods)[0] : null,
					}
				}, fbkt().app._router.stack);

				return fbkt().restApiRoutes = R.filter(function(route){
					const filter = fbkt().getConfigValue('appRouteFilter', 'CAPTURE NO ROUTES');
					return route.url != null && (filter === '*' || route.url.indexOf(filter) > 0);
				}, routes);
			}
		}
	}, callInfo || {});
};