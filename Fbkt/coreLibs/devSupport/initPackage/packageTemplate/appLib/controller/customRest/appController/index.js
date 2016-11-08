//noinspection JSUnresolvedFunction
const fbkt = require('../../../../../Fbkt');
const Promise = require('bluebird');


module.exports = {
	url:      '/appControllerEndpoint',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return Promise.resolve(`NEW APP CONTROLLER`);
			}
		},
		getOne: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `GET ONE NEW APP CONTROLLER - ${callInfo.params.id}`;
			}
		},
		post: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `POST NEW APP CONTROLLER - ${callInfo.params.uuid}`;
			}
		},
		put: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `PUT NEW APP CONTROLLER - ${callInfo.params.uuid}`;
			}
		},
		delete: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `DELETE NEW APP CONTROLLER - ${callInfo.params.id}`;
			}
		},
	}
};
