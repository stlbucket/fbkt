var _ = require('lodash');
var fbkt = require('../../../../../../Fbkt');

module.exports = function(){
  const appRouteFilter = fbkt().config.appRouteFilter || '*';
	fbkt().clog('APP ROUTES', _.filter(fbkt().restApiRoutes, function(appRoute){
		return appRouteFilter !== '*' ? appRoute.url.indexOf(appRouteFilter) !== -1 : true;
	}), true);
};
