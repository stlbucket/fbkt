"use strict";
module.exports = {
	packageName:			'FbktServer',
	libRelativePath:	function(){
		return __dirname;
	},
	runCurrentTest:	require('./runCurrentTest'),
	runAllUnitTests:	require('./runAllUnitTests'),
	setCurrentUnitTest:	require('./setCurrentUnitTest'),
};