const fbkt = require('../../../../../../Fbkt');
const Promise = require('bluebird');
const pingEmitter = require('../../../eventEmitter/ping')();

module.exports = {
	url:      '/ping',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
        fbkt().clog('GET ALL PING', callInfo.params, true);
        return Promise.resolve(`GET ALL PING`);
			}
		},
		getOne: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
        fbkt().clog('GET ONE PING', callInfo.params, true);
        pingEmitter.emit('PING_ONE', callInfo);
				return `GET ONE PING - ${callInfo.params.id}`;
			}
		},
    post: {
      disabled: false,
      auth: 'none',
      handler: function (callInfo) {
        fbkt().clog('POST PING', callInfo.params, true);
        return `POST PING - ${callInfo.params.id}`;
      }
    },
    patch: {
      disabled: false,
      auth: 'none',
      handler: function (callInfo) {
        fbkt().clog('PATCH PING', callInfo.params, true);
        return `PATCH PING - ${callInfo.params.id}`;
      }
    },
    put: {
      disabled: false,
      auth: 'none',
      handler: function (callInfo) {
        fbkt().clog('PUT PING', callInfo.params, true);
        return `PUT PING - ${callInfo.params.id}`;
      }
    },
    delete: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
        fbkt().clog('DELETE PING', callInfo.params, true);
        return `DELETE PING - ${callInfo.params.id}`;
			}
		},
	}
};
