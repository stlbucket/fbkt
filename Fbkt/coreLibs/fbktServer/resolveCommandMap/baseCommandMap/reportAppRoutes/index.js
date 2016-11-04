var _ = require('lodash');
var fbkt = require('../../../../../../Fbkt');

module.exports = function(){
	fbkt().clog('APP ROUTES', _.filter(fbkt().restApiRoutes, function(appRoute){
		return true;
	}));
};
