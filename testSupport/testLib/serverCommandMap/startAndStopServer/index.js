const fbkt = require('../../../../index');
const tasks = fbkt(null, null, true).tasks;

module.exports = {
	description: [
		'node fbktServer [app].[env] startAndStopServer',
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