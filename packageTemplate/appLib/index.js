module.exports = {
	packageName:	'testLib',
	libRelativePath:	function(){
		return __dirname;
	},
	serverExtensions:	require('./serverExtensions'),
	customRestControllers:	[
		require('./controller/customRest/pong'),
	],
};
