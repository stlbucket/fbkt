let Fbkt = require('./index');
let config = require('./config');

const appLibs = {
	testLib:	require('./testSupport/testLib')
};

const fbkt = Fbkt(config, appLibs);

fbkt.runServer();