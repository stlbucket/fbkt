const appConfig = require('../index');
const R = require('ramda');
require('dotenv-safe').load({
  allowEmptyValues: false,
  sample: './.env.example'
});

module.exports = R.merge(appConfig, {
    appRouteFilter: process.env.APP_ROUTE_FILTER,
    restErrorMode: process.env.REST_ERROR_MODE,
    defaultEntityControllerAuth: process.env.DEFAULT_ENTITY_CONTROLLER_AUTH
  }
);