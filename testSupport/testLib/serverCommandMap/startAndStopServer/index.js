const tasks = require('../../../../index').baseCommandMap.tasks;

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