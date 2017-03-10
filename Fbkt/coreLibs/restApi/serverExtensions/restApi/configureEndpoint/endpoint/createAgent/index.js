"use strict";
const fbkt = require('../../../../../../../../Fbkt');
const Promise = require('bluebird');


var _agents = [];

const Agent = class {
	constructor(handler) {
		this.handler = handler;
	}
	
	buildCallInfo(requestInfo){
    let params;
    switch(requestInfo.method){
      case 'GET':
        params =  requestInfo.params;
        break;
      case 'POST':
        params =  requestInfo.body;
        break;
      case 'PUT':
        params =  Object.assign(requestInfo.params, requestInfo.body);
        break;
      case 'PATCH':
        params =  Object.assign(requestInfo.params, requestInfo.body);
        break;
      case 'DELETE':
        params =  requestInfo.params;
        break;
    }

    // fbkt().clog(requestInfo.method, params, true);

    return {
      user: requestInfo.user,
      params: params
    };
  }

	handleRequest(requestInfo){
    const callInfo = this.buildCallInfo(requestInfo);
		const handler = this.handler;

		return Promise.resolve(handler(callInfo))
			.then((result)=>{
				requestInfo.res.send(result);
			})
			.catch((error)=>{
				console.log('REST ERROR', error);
				switch(fbkt().config.restErrorMode) {
					case "OPEN":	
						requestInfo.res.send(error);
						break;
					default:
						requestInfo.res.send(500);
						break;
				}
			});
	}
};


module.exports = (callInfo)=>{
	const agent = new Agent(callInfo.params.handler);
	_agents.push(agent);
	return agent.handleRequest.bind(agent);
};