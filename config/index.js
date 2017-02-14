const args = require('minimist')(process.argv.slice(2));
const NODE_ENV = args.NODE_ENV;
const envPath = `./.env.${NODE_ENV}`;
process.env.NODE_ENV = NODE_ENV;

require('dotenv-safe').load({
  allowEmptyValues: false,
  sample: './.env.example',
  path: envPath
});

module.exports = {
  appRouteFilter: process.env.APP_ROUTE_FILTER,
  restErrorMode: process.env.REST_ERROR_MODE,
  defaultEntityControllerAuth: process.env.DEFAULT_ENTITY_CONTROLLER_AUTH,
  port: process.env.PORT || 20831
};