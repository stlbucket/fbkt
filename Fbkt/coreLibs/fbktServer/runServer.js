"use strict";
let R = require('ramda');
let Promise = require('bluebird');
const sequence = require('when/sequence');  //todo: get rid of when lib
const resolveCommandMap = require('./resolveCommandMap');

var fbkt = require('../../../Fbkt');

module.exports = function() {
	const commandMap = resolveCommandMap();
  const command = process.argv[3] || 'runServer';

  fbkt().clog('COMMAND MAP', commandMap);
	fbkt().clog('COMMAND', command);
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
    console.log('KNOWN COMMAND', knownCommand);

		return sequence(knownCommand.commandList, knownCommand.args)
		
		// return Promise.each(
		// 	knownCommand.commandList,
		// 	command=>{
		// 		return command(knownCommand.args);
		// 	}
		// )
	} else if (R.is(Function, knownCommand)){
		return knownCommand();
	} else {
		console.log('THIS IS VERY WRONG:', commandMap[knownCommand]);
	}
};