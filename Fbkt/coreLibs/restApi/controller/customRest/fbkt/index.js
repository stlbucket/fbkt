const fbkt = require('../../../../../../Fbkt');
const R = require('ramda');

module.exports = {
	url:      '/fbkt',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
				return fbkt().config;
			}
		}
	}
};
