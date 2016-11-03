"use strict";
var R = require('ramda');

var _fbktLibs = null;

module.exports = (config)=>{
	if (_fbktLibs) { return _fbktLibs; }
	else {
		const appLibsConfig = config.getConfigValue('appLibs', []);
		const fbktLibsConfig = config.getConfigValue('fbktLibs', []);
		const devLibsConfig = config.getConfigValue('devLibs', []);

		const coreLibs = require('./coreLibs');
		const devLibs = R.reduce((libs, lib)=>{
			// console.log('devLibsConfig', lib, libs);
			return R.merge(libs, { [lib]:	require('../devLibs/'+lib) });
		}, {}, devLibsConfig);
		const fbktLibs = R.reduce((libs, lib)=>{
			// console.log('fbktLibsConfig', lib, libs);
			return R.merge(libs, { [lib]:	require('/fbktLibs/'+lib) });
		}, {}, fbktLibsConfig);
		const appLibs = R.reduce((libs, lib)=>{
			// console.log('appLibsConfig', lib, libs);
			return R.merge(libs, { [lib]:	require('../appLibs/'+lib) });
		}, {}, appLibsConfig);
		
		_fbktLibs = R.mergeAll([
			coreLibs,
			fbktLibs,
			appLibs,
			devLibs
		]);
		// console.log('_fbktLibs', R.keys(_fbktLibs)); process.exit();

		return _fbktLibs;
	}
};
