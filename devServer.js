let Fbkt = require('./index');
let config = require('./config/dev');

var command = process.argv[3] || 'runServer';
const fbkt = Fbkt(config);
fbkt.runServer(command);


