"use strict";
const Promise = require('bluebird');
const R = require('ramda');
const fbkt = require('../../../../../../Fbkt');

module.exports = ()=>{

	const extensions = fbkt().getComponentFromAllLibs('serverExtensions');
  fbkt().clog('==========INIT SERVER EXTENSIONS==========', extensions);

	return Promise.mapSeries(
		extensions, 
		(ext)=> {
			return ext[R.keys(ext)[0]]();
		});
};