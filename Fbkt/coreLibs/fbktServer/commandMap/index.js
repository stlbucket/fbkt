"use strict";
module.exports = {
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
	patchDb: {
		description:	[
			'node fbktServer [app].[env] patchDb',
			'',
			'-- applies all library dbPatches'
		],
		commandList: [
			, createFbkt
			, buildDb
			, stopServer
		],
		args: {
			executionMode: 'BUILD_DB'
		}
	},
	buildDb: {
		description:	[
			'node fbktServer [app].[env] buildDb',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data'
		],
		commandList: [
			createFbkt
			, wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, stopServer
		],
		args: {
			executionMode: 'BUILD_DB'
		}
	},
	buildDbWithData: {
		description:	[
			'node fbktServer [app].[env] buildDbWithData',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- loads optional db data'
		],
		commandList: [
			createFbkt
			, wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, loadBuildDbData
			, stopServer
		],
		args: {
			executionMode: 'BUILD_DB'
		}
	},
	loadData: {
		description:	[
			'node fbktServer [app].[env] loadData',
			'',
			'-- loads optional db data'
		],
		commandList: [
			createFbkt
			, fireServerReadyEvent
			, loadBuildDbData
			, stopServer
		]
	},
	wipeDb: {
		description:	[
			'node fbktServer [app].[env] wipeDb',
			'',
			'-- wipes database completely',
		],
		commandList: [
			createFbkt
			, wipeDb
			, stopServer
		],
		args: {
			executionMode: 'BUILD_DB'
		}
	},
	runStubServer: {
		description:	[
			'node fbktServer [app].[env] stubServer',
			'',
			'-- stubs out all controllers',
			'-- really this is useless and will go away'
		],
		commandList: [
			createFbkt
			, fireServerReadyEvent
			, stubControllers
			, stopServer
		]
	},
	runServer: {
		description:	[
			'node fbktServer [app].[env]',
			'',
			'-- obvious, no?',
		],
		commandList: [
			createApp
			, createFbkt
			, fireServerReadyEvent
			, initControllers
			, reportFbktStructure
			, startServer
		]
	},
	setCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] [pathToTest]',
			'OR',
			'node fbktServer [app].[env] [libName] [lib/path/to/component]',
			'OR',
			'node fbktServer [app].[env] [libName] [lib/path/to/component] [libSet]',
			'',
			'-- configures your local environment with the specified test',
			'-- libSet defaults to FbktLibs.  FbktCore is the only other value you should ever need but never use!'
		],
		commandList: [
			createFbkt,
			setCurrentUnitTest,
			stopServer
		]
	},
	createNewUnitTest: {
		description:	[
			'node fbktServer [app].[env] createNewUnitTest [libName] [lib/path/to/component]',
			'',
			'-- creates unit test and configures local environment runCurrentUnitTest',
		],
		commandList: [
			createFbkt,
			createNewUnitTest,
			stopServer
		]
	},
	createNewFbktMethod: {
		description:	[
			'node fbktServer [app].[env] createNewFbktMethod [libName] [lib/path/to/component]',
			'',
			'-- creates an fbktMethod component with no unit test',
		],
		commandList: [
			createFbkt,
			createNewFbktMethod,
			stopServer
		]
	},
	createNewFbktSqlMethod: {
		description:	[
			'node fbktServer [app].[env] fbktSqlMethod [libName] [lib/path/to/component]',
			'',
			'-- creates an fbktSqlMethod component with no unit test',
		],
		commandList: [
			createFbkt,
			createNewFbktSqlMethod,
			stopServer
		]
	},
	createNewFbktSqlMethodSuite: {
		description:	[
			'node fbktServer [app].[env] newFbktSqlMethod [libName] [lib/path/to/component]',
			'',
			'-- creates an fbktSqlMethod component with unit test',
			'-- configure environment for new test',
			'-- run new unit test',
		],
		commandList: [
			createFbkt,
			createNewFbktSqlMethodSuite,
			stopServer
		]
	},
	createNewFbktMethodSuite: {
		description:	[
			'node fbktServer [app].[env] newFbktMethod [libName] [lib/path/to/component]',
			'',
			'-- creates an fbktMethod component with unit test',
			'-- configure environment for new test',
			'-- run new unit test',
		],
		commandList: [
			createFbkt,
			createNewFbktMethodSuite,
			stopServer
		]
	},
	// createNewFbktPackageIndex:	{
	// 	description:	[
	// 		'node fbktServer [app].[env] newFbktPackageIndex [libName]',
	// 		'',
	// 		'-- creates an fbktPackageIndex in the specified directory',
	// 		'-- will not overwrite an existing index.js file',
	// 	],
	// 	commandList: [
	// 		createFbkt,
	// 		createNewFbktPackageIndex,
	// 		stopServer
	// 	]
	// },
	runCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] runCurrentUnitTest',
			'',
			'-- run current unit test',
		],
		commandList: [
			createFbkt,
			fireServerReadyEvent,
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
			createFbkt,
			fireServerReadyEvent,
			allUnitTests,
			stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	runAllIntegrationTests: {
		description:	[
			'node fbktServer [app].[env] runAllIntegrationTests',
			'OR',
			'node fbktServer [app].[env] runAllIntegrationTests [libName]',
			'',
			'-- run all integration tests',
			'-- tests are limited to lib if specified'
		],
		commandList: [
			createFbkt,
			fireServerReadyEvent,
			allIntegrationTests,
			stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	runUiRouteTests: {
		description:	[
			'node fbktServer [app].[env] runUiRouteTests',
			'',
			'-- open browser to #TestRoutes',
		],
		commandList: [
			createApp
			, createFbkt
			, fireServerReadyEvent
			, initControllers
			, reportFbktStructure
			, startServer
			, setupUiRouteTestReportHandler
			, allUiRouteTests
		],
		args: {
			executionMode: 'TEST'
		}
	},
	buildDbAndRunCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] buildDbAndRunCurrentUnitTest',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- runs current unit test'
		],
		commandList: [
			createFbkt,
			wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, reportFbktStructure
			, currentUnitTest
			, stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	buildDbWithDataAndRunCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] buildDbAndRunCurrentUnitTest',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- loads optional db data',
			'-- runs current unit test'
		],
		commandList: [
			createFbkt,
			wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, loadBuildDbData
			, reportFbktStructure
			, currentUnitTest
			, stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	buildDbAndRunAllUnitTests: {
		description:	[
			'node fbktServer [app].[env] buildDbAndRunCurrentUnitTest',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- runs all unit tests'
		],
		commandList: [
			, createFbkt
			, wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, reportFbktStructure
			, allUnitTests
			, stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	buildDbWithDataAndRunAllUnitTests: {
		description:	[
			'node fbktServer [app].[env] buildDbAndRunCurrentUnitTest',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- loads optional db data',
			'-- runs all unit tests'
		],
		commandList: [
			, createFbkt
			, wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, loadBuildDbData
			, reportFbktStructure
			, allUnitTests
			, stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
	buildDbAndRunAllUnitTestsAndUiRouteTests: {
		description:	[
			'node fbktServer [app].[env] buildDbAndRunCurrentUnitTest',
			'',
			'-- wipes database completely',
			'-- applies all library dbScripts',
			'-- applies all library dbPatches',
			'-- loads non-optional db data',
			'-- runs all unit tests',
			'-- open browser to #TestRoutes',
		],
		commandList: [
			createApp
			, createFbkt
			, wipeDb
			, buildDb
			, loadDbBuildDataNotOptional
			, fireServerReadyEvent
			, setupUiRouteTestReportHandler
			, initControllers
			, reportFbktStructure
			, startServer
			, allUnitTests
			, allUiRouteTests
		],
		args: {
			executionMode: 'TEST'
		}
	},
};
