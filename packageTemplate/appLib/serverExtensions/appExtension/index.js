"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../Fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'appExtension',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"newFunction": (callInfo)=> {
				fbkt().clog('appExtension', callInfo);
			}
		}
	}, callInfo);
};
