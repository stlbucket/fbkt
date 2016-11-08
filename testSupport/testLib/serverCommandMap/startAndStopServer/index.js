const fbkt = require('../../../../index');
const tasks = fbkt.baseCommandMap.tasks;

module.exports = {
	description: [
		'node fbktServer [env] startAndStopServer',
	],
	commandList: [
		tasks.createApp,
		tasks.initServerExtensions,
		tasks.stopServer
	],
	args:        {
		executionMode: 'TEST'
	}
};