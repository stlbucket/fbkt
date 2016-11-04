const appConfig = require('../index');
const R = require('ramda');

module.exports = R.merge(appConfig, {
	appRouteFilter:	'*'
});