"use strict";
var R = require('ramda');
var Promise = require('bluebird');
var fbkt = require('../../../../Fbkt');

module.exports = ()=>{
	return fbkt().FbktPipe({
		name:           'setCurrentUnitTest',
		filename:       __filename,
		pipelineSteps: {  // any number of functions
			"applyTemplate": function (callInfo) {
				return fbkt().hbTemplateManager({
					templateFilePath: 'scripts/core/unitTest/setCurrentUnitTest/template.hbs',
					templateData:     callInfo.params,
					executionMode:    'REPORTIT',
					reportFileName:   './ignoreAllThis/currentUnitTest.js'
				})();
			}
		}
	});
};