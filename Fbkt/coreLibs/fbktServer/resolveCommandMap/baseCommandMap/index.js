var createApp = require('./createApp');
var currentUnitTest = require('./runCurrentUnitTest');
var allUnitTests = require('./runAllUnitTests');
var initServerExtensions = require('./initServerExtensions');
var executeStartupPackages = require('./executeStartupPackages');
var startServer = require('./startServer');
var stopServer = require('./stopServer');
var reportFbktConfig = require('./reportFbktConfig');
var reportAppRoutes = require('./reportAppRoutes');
var reportUnknownCommand = require('./reportUnknownCommand');

const reportCommandMap = function(){
	var theOnlyCommandToReport = process.argv[4] || 'ALL OF THEM';

	console.log('**********COMMAND MAP*********')
	console.log('');
	_.forOwn(commandMap, function(commandInfo, commandName){

		if (theOnlyCommandToReport === 'ALL OF THEM' || theOnlyCommandToReport === commandName) {
			console.log('~~~~~~~~~~ ' + commandName);
		}

		if (theOnlyCommandToReport === commandName){

			_.forEach(commandInfo.description, function(line){
				console.log(line);
			});
			console.log('');
		}

	});
	console.log('********END COMMAND MAP*******')

	if (theOnlyCommandToReport === 'ALL OF THEM') {
		console.log('');
		console.log('FOR MORE INFO ON A COMMAND: node fbktServer help [commandName]');
		console.log('');
	}
};

module.exports = {
	tasks:	{
		createApp:	createApp,
		currentUnitTest:	currentUnitTest,
		allUnitTests:	allUnitTests,
		initServerExtensions:	initServerExtensions,
		executeStartupPackages:	executeStartupPackages,
		startServer:	startServer,
		stopServer:	stopServer,
		reportFbktConfig:	reportFbktConfig,
		reportAppRoutes:	reportAppRoutes,
		reportUnknownCommand:	reportUnknownCommand
	},
	help: {
		description:	[
			'node fbktServer [app].[env] help',
			'OR',
			'node fbktServer [app].[env] help commandName',
			'',
			'-- infinite recursion detected....'
		],
		commandList: [
			reportCommandMap
		]
	},
	runServer: {
		description:	[
			'node fbktServer [app].[env]',
			'',
			'-- obvious, no?',
		],
		commandList: [
			createApp,
			initServerExtensions,
			executeStartupPackages,
			reportFbktConfig,
			reportAppRoutes,
			startServer
		]
	},
	runCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] runCurrentUnitTest',
			'',
			'-- run current unit test',
		],
		commandList: [
			createApp,
			initServerExtensions,
			executeStartupPackages,
			currentUnitTest,
			stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	runAllUnitTests: {
		description:	[
			'node fbktServer [app].[env] runAllUnitTests',
			'OR',
			'node fbktServer [app].[env] runAllUnitTests [libName]',
			'',
			'-- run all unit tests',
			'-- tests are limited to lib if specified'
		],
		commandList: [
			createApp,
			initServerExtensions,
			executeStartupPackages,
			allUnitTests,
			stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
};
