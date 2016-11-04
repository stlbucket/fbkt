"use strict";
const fbkt = require('../../../../Fbkt');
const R = require('ramda');
const baseCommandMap = require('./baseCommandMap');

module.exports = ()=>{
	const allCommandMaps = fbkt().getComponentFromAllLibs('serverCommandMap');

	return R.merge(baseCommandMap, R.mergeAll(allCommandMaps));
};



