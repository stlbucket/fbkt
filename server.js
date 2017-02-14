require('./loadEnv');
const Fbkt = require('./index');
const config = require('./config');
const appLibs = {
	testLib:	require('./testSupport/testLib')
};

const fbkt = Fbkt(config, appLibs);

fbkt.runServer();