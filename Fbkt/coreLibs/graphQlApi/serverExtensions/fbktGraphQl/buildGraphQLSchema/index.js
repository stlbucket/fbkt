"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../Fbkt');


module.exports = (callInfo)=> {
	return fbkt().FbktPipe({
		name:           'buildGraphQLSchema',
		filename:       __filename,
		expectedParams: {},
		pipelineParams: {},
		pipelineSteps:  {
			"buildGraphQLSchema": (callInfo)=> {
				const composites = fbkt().getComponentFromAllLibs('composites');
				fbkt().clog('ALL COMPOSITES', composites);
				
				// const 
				// process.exit();
			}
		}
	}, callInfo);
};