"use strict";
const R = require('ramda');

module.exports = ()=>{
	const config = require('./config')();
	const fbktLibs = config.getConfigValue('fbktLibs', []);
	const devLibs = config.getConfigValue('devLibs', []);
	
	return R.mergeAll([
		{},
		require('./utility').fbktShortcuts,
		require('./fbktPipe').fbktShortcuts,
		R.reduce((shortcuts, lib)=>{
			// console.log('fbktLibsConfig', lib, shortcuts);
			return R.merge(shortcuts, require('/fbktLibs/'+lib).fbktShortcuts );
		}, {}, fbktLibs),
		R.reduce((shortcuts, lib)=>{
			// console.log('devLibsConfig', lib, shortcuts);
			return R.merge(shortcuts, require('../devLibs/'+lib).fbktShortcuts );
		}, {}, devLibs)
	]);
};
