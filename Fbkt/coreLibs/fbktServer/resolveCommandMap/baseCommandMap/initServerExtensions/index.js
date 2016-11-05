"use strict";
const Promise = require('bluebird');
const R = require('ramda');
const fbkt = require('../../../../../../Fbkt');

module.exports = ()=>{
	console.log('==========INIT SERVER EXTENSIONS==========');

	const extensions = fbkt().getComponentFromAllLibs('serverExtensions');
	console.log('EXTENSIONS', extensions);

	return Promise.mapSeries(
		extensions, 
		(ext)=> {
			return ext[R.keys(ext)[0]]();
		});
	
	// var serverExtensionsAreInitialized = [];
	//
	// _.forOwn(fbkt().fbktLibs, function(lib){
	// 	if (is.array(lib.serverExtensions)){
	// 		_.forEach(lib.serverExtensions, function(serverExtension){
	// 			serverExtensionsAreInitialized.push(serverExtension);
	// 		});
	// 	}
	// });
	//
	// return sequence(serverExtensionsAreInitialized);
};