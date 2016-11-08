module.exports = {
	packageName:	'myNewApp',
	libRelativePath:	function(){
		return __dirname;
	},
	serverExtensions:	require('./serverExtensions/index'),
	customRestControllers:	[
		require('./controller/customRest/appController/index'),
	],
};
