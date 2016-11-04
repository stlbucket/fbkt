"use strict";
const fbkt = require('../../../../../../Fbkt');

module.exports = ()=>{
	const port = process.env.PORT || fbkt().getConfigValue('port') || 20831;
	
	fbkt().app.listen(port, function () {
		console.log('...');
		console.log('...');
		console.log('come with me if you want to live');
		console.log('...');
		console.log('functioN_Bucket is intently listening on port '+port);
	});
};