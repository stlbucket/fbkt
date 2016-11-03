"use strict";
const R = require('ramda');
var fbkt = require('../fbkt');

var config = require('./config')();

module.exports = (_app)=>{
	if (fbkt() === null && _app){
		const _fbkt = R.merge(
			{
				appConfiguration:	config.getConfig(),
				config:			config,
				app:				_app,
				libs:			require('./fbktLibs')(config),
				R:	require('ramda'),
				Promise:	require('bluebird'),
				eventHandlers:		{},
				serverInfo: function() {
					var serverUrl = config.getConfigValue('serverUrl') || 'http://localhost:20831';
					return {
						baseUrl:	serverUrl
					};
				},
				getComponentFromAllLibs(componentName){
					return R.reduce(
						(allComponents, lib)=> {
							const libComponents = lib[componentName] || [];
							return allComponents.concat(libComponents);
						},
						[],
						R.values(fbkt().libs));				
				},
			}
			,require('./shortcuts')()
		);
		//console.log('THE BRAND NEW FBKT', _fbkt);
		// console.log('DONE BUILDING FBKT', _fbkt);
		// process.exit();
		return fbkt(_fbkt);
	} else {
		return fbkt();
	}
};

