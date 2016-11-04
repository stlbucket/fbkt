"use strict";
var fbkt = require('../../../../../../Fbkt');

module.exports = function(){
	return fbkt().libs.unitTest.runCurrentTest();
};