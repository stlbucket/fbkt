"use strict";
let R = require('ramda');
var _ = require('lodash');
var util = require('util');
var when = require('when');
var sequence = require('when/sequence');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
// var postgraphql = require('postgraphql').postgraphql;


var buildFbkt = require('../buildFbkt.js');
var fbkt = require('../../fbkt');
var _app = 'NO_APP';

var loadDbTree = require('./loadDbTree');
var currentUnitTest = require('./runCurrentUnitTest');
var allUnitTests = require('./runAllUnitTests');
var initServerExtensions = require('./initServerExtensions');
var executeStartupPackages = require('./executeStartupPackages');
var startServer = require('./startServer');
var stopServer = require('./stopServer');

var reportFbktConfig = require('./reportFbktConfig');

var createApp = function() {
	_app = express();
	_app.use(cors());
	_app.use(bodyParser.json());       // to support JSON-encoded bodies
	_app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));
};


var createFbkt = function(args){
	args = args || {
			executionMode:	'PROD'
		};
	
	return when(buildFbkt(_app))
		.then(function(){``
			fbkt().executionMode = args.executionMode;
			fbkt().clog('EXECUTION MODE', fbkt().executionMode);
			return sequence([
				loadDbTree,
				initServerExtensions
			]);
		});
};


var reportUnknownCommand = function(command){
	console.log('');
	console.log("------")
	console.log('');
	console.log("THERE ARE KNOWN COMMANDS AND THERE ARE UNKNOWN COMMANDS...");
	console.log("THAT IS TO SAY THERE ARE COMMANDS WE KNOW WE KNOW...");
	console.log("AND COMMANDS WE KNOW WE DON'T KNOW...");
	console.log("BUT THERE ARE ALSO COMMANDS WE DON'T KNOW WE DON'T KNOW...");
	console.log('');
	console.log("------")
	console.log('');
	console.log("YOUR'S IS AN UNKNOWN UNKNOWN COMMAND: ", "'"+command+"'");
	console.log('');
};

var reportCommandMap = function(){
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

module.exports = function(command){
	var knownCommand = _.indexOf(_.keys(commandMap), command) > -1 ? command : 'UNKNOWN';
	if (knownCommand !== 'UNKNOWN'){
		if (R.is(Array, commandMap[knownCommand].commandList)){
			return sequence(commandMap[knownCommand].commandList, commandMap[knownCommand].args)
		} else if (R.is(commandMap[knownCommand])){
			commandMap[knownCommand]();
		} else {
			console.log('THIS IS VERY WRONG:', commandMap[knownCommand]);
		}
	} else {
		reportUnknownCommand(command);
		reportCommandMap();
	}
};


var commandMap = {
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
			createApp
			, createFbkt
			, executeStartupPackages
			, reportFbktConfig
			, startServer
		]
	},
	runCurrentUnitTest: {
		description:	[
			'node fbktServer [app].[env] runCurrentUnitTest',
			'',
			'-- run current unit test',
		],
		commandList: [
			createApp
			, createFbkt,
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
			createApp
			, createFbkt,
			executeStartupPackages,
			allUnitTests,
			stopServer
		],
		args: {
			executionMode: 'TEST'
		}
	},
};
