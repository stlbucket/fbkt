let Fbkt = require('./index');
let config = require('./config/dev');

var command = process.argv[3] || 'runServer';
const appLibs = {
	testLib:	require('./testSupport/testLib')
};

const fbkt = Fbkt.buildServer(config, appLibs);

fbkt.clog('FBKT CONFIG', fbkt, true);
fbkt.runServer(command);


