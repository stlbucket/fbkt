module.exports = {
	packageName:	'testLib',
	libRelativePath:	function(){
		return __dirname;
	},
	serverCommandMap:	require('./serverCommandMap'),
	serverExtensions:	require('./serverExtensions'),
	customRestControllers:	[
		require('./controller/customRest/pong'),
	],
};