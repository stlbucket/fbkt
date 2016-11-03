"use strict";
var fbkt = require('../../../fbkt');

module.exports = function(){
	return fbkt().libs.unitTest.runCurrentTest();
};