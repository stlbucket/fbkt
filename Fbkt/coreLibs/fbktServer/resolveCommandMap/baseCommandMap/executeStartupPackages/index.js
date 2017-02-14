"use strict";
const fbkt = require('../../../../../../Fbkt');
const Promise = require('bluebird');

module.exports = ()=>{
	const startupPackages = fbkt().getComponentFromAllLibs('startupPackage');
  fbkt().clog('FIRE SERVER READY EVENT', startupPackages, true);

  return Promise.each(
		startupPackages,
		(startupPackage)=>{
			return startupPackage();
		}
	);
	
};