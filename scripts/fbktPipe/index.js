"use strict";
module.exports = {
	packageName:			'FbktPipe',
	libRelativePath:	function(){
		return __dirname;
	},
	fbktShortcuts:	{
		FbktPipe:		require('./fbktPipe')
	},
	customRestControllers:	[
	],
};