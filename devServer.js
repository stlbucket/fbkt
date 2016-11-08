let Fbkt = require('./index');
let config = require('./config/dev');

const appLibs = {
	testLib:	require('./testSupport/testLib')
};

const fbkt = Fbkt(config, appLibs);

fbkt.runServer();