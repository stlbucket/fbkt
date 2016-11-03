"use strict";

module.exports = {
	ping: (x)=>{return `PONG - ${x}`},
	fbktServer:	(command, target)=>{
		require('./config')(target);
		const fbktServer = require('./fbktServer');
		fbktServer.runServer(command);
	}
};