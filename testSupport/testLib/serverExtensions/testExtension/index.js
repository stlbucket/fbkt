"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../Fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'testExtension',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"newFunction": (callInfo)=> {
				fbkt().clog('testExtension', callInfo);
				process.exit();
			}
		}
	}, callInfo);
};