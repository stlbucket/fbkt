"use strict";
module.exports = {
	packageName:			'FbktServer',
	libRelativePath:	function(){
		return __dirname;
	},
	runServer:	require('./runServer'),
	serverCommandMap:	require('./resolveCommandMap/baseCommandMap')
};