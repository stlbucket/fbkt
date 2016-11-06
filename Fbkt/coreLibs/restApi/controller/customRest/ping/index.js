const fbkt = require('../../../../../../Fbkt');
const Promise = require('bluebird');


module.exports = {
	url:      '/ping',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				// console.log('PING GET ALL');
				return Promise.resolve(`GET ALL PING`);
				// return "GET ALL PING";
			}
		},
		getOne: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `GET ONE PING - ${callInfo.params.id}`;
			}
		},
		post: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `POST PING - ${callInfo.params.uuid}`;
			}
		},
		put: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `PUT PING - ${callInfo.params.uuid}`;
			}
		},
		delete: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return `DELETE PING - ${callInfo.params.id}`;
			}
		},
	}
};
