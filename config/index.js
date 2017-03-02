module.exports = {
  port: process.env.PORT || 20831,
  appRouteFilter: process.env.APP_ROUTE_FILTER,
  restErrorMode: process.env.REST_ERROR_MODE,
  defaultEntityControllerAuth: process.env.DEFAULT_ENTITY_CONTROLLER_AUTH,
  apiVersion: process.env.API_VERSION,
  enableGraphIql: process.env.ENABLE_GRAPH_IQL
};