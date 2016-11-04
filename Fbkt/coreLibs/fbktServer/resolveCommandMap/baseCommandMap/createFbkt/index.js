var fbkt = require('../../../../../Fbkt');

var createFbkt = function(args){
	args = args || {
			executionMode:	'PROD'
		};

	return initServerExtensions();
};
