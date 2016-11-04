"use strict";
const fbkt = require('../../../../../../Fbkt');
const Promise = require('bluebird');

module.exports = ()=>{
	console.log('==========FIRE SERVER READY EVENT==========');
	const startupPackages = fbkt().getComponentFromAllLibs('startupPackages');

	return Promise.each(
		startupPackages,
		(startupPackage)=>{
			return startupPackage();
		}
	);
	
};