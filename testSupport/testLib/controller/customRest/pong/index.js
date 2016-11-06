const fbkt = require('../../../../../Fbkt');
const Promise = require('bluebird');


module.exports = {
	url:      '/pong',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				// console.log('PONG GET ALL');
				return Promise.resolve(`GET ALL PONG`);
				// return "GET ALL PONG";
			}
		},
		getOne: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `GET ONE PONG - ${callInfo.params.id}`;
			}
		},
		post: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `POST PONG - ${callInfo.params.uuid}`;
			}
		},
		put: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `PUT PONG - ${callInfo.params.uuid}`;
			}
		},
		delete: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `DELETE PONG - ${callInfo.params.id}`;
			}
		},
	}
};
