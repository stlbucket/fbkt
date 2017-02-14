const createApp = require('./createApp');
const currentUnitTest = require('./runCurrentUnitTest');
const allUnitTests = require('./runAllUnitTests');
const initServerExtensions = require('./initServerExtensions');
const executeStartupPackages = require('./executeStartupPackages');
const startServer = require('./startServer');
const stopServer = require('./stopServer');
const reportFbktConfig = require('./reportFbktConfig');
const reportAppRoutes = require('./reportAppRoutes');
const reportUnknownCommand = require('./reportUnknownCommand');
const args = require('minimist')(process.argv.slice(2));

const reportCommandMap = function(){
  var theOnlyCommandToReport = args.command || args.c || 'ALL OF THEM';

  console.log('**********COMMAND MAP*********')
	console.log('');
	_.forOwn(commandMap, function(commandInfo, commandName){
``
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
		],
		commandList: [
			reportCommandMap
		]
	},
	runServer: {
		description:	[
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
  runAllUnitTests: {
    description:	[
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
  }
};
