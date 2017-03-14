const fbkt = require('../../../../../../Fbkt');
const R = require('ramda');

module.exports = {
	url:      '/fbkt',
	restEndpoints: {
		getAll: {
			disabled: false,
			auth:     'none',
			handler:  function (callInfo) {
        console.log(R.keys(fbkt()));
				return {
          config: fbkt().config
        };
			}
		}
	}
};
