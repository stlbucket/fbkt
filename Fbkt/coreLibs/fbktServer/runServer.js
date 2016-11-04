"use strict";
let R = require('ramda');
let Promise = require('bluebird');
const sequence = require('when/sequence');  //todo: get rid of when lib
const resolveCommandMap = require('./resolveCommandMap');

var fbkt = require('../../../Fbkt');

module.exports = function(command) {
	const commandMap = resolveCommandMap();
	
	fbkt().clog('COMMAND MAP', commandMap);
	fbkt().clog('COMMAND', command);

	if (R.is(Array, commandMap[command].commandList)){
		return sequence(commandMap[command].commandList, commandMap[command].args)
		
		// return Promise.each(
		// 	commandMap[command].commandList,
		// 	command=>{
		// 		return command(commandMap[command].args);
		// 	}
		// )
	} else if (R.is(Function, commandMap[command])){
		return commandMap[command]();
	} else {
		console.log('THIS IS VERY WRONG:', commandMap[knownCommand]);
	}
};