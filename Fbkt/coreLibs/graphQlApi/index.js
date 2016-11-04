module.exports = {
	packageName:	'FbktGraphQl',
	libRelativePath:	function(){
		return __dirname;
	},
	serverExtensions:	[
		require('./serverExtensions/fbktGraphQl')
	],
	customRestControllers: [
		// require('./controllers/customRest/graphql')	
	]
};