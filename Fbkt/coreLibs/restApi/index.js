"use strict";
module.exports = {
	packageName:			'RestApi',
	libRelativePath:	function(){
		return __dirname;
	},
	fbktShortcuts:	{
	},
	customRestControllers:	[
		require('./controller/customRest/fbkt'),
		require('./controller/customRest/ping'),
	],
	serverExtensions:	[
		require('./serverExtensions'),
	],
};