module.exports = {
	packageName:	'FbktGraphQl',
	libRelativePath:	function(){
		return __dirname;
	},
	serverExtensions:	require('./serverExtensions'),
	customRestControllers: [
		// require('./controllers/customRest/graphql')	
	]
};