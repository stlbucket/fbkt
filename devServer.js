let Fbkt = require('./index');
let config = require('./config/dev');

const appLibs = {
	testLib:	require('./testSupport/testLib')
};

Fbkt(config, appLibs);

