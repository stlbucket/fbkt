"use strict";
let R = require('ramda');
let Promise = require('bluebird');
const sequence = require('when/sequence');  //todo: get rid of when lib
const resolveCommandMap = require('./resolveCommandMap');
const args = require('minimist')(process.argv.slice(2));

var fbkt = require('../../../Fbkt');

module.exports = function() {
	const commandMap = resolveCommandMap();
  console.log('args', args);
  const command = args.command || args.c || 'runServer';

  fbkt().clog('COMMAND MAP', commandMap, true);
	fbkt().clog('COMMAND', command, true);
	const knownCommand = commandMap[command];
	if (R.isNil(knownCommand)){
		console.log(`
		There are known commands and there are unkown commands.
		...
		That is to say, there are commands we know we know,
		and there are commands we know we don't know.
		But there are also commands we don't know we don't know.
		....
		For sure, though, we don't know about this command.
		
		
		=============================================
		${command}
		=============================================
		`);
	} else if (R.is(Array, knownCommand.commandList)){
    console.log('KNOWN COMMAND', command, knownCommand);

    return sequence(knownCommand.commandList, knownCommand.args)

	} else if (R.is(Function, knownCommand)){
		return knownCommand();
	} else {
		console.log('THIS IS VERY WRONG:', commandMap[knownCommand]);
	}
};