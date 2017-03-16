require('./loadEnv');
let __fbkt           = null;
const Fbkt           = require('./Fbkt');
const baseCommandMap = require('./Fbkt/coreLibs/fbktServer/resolveCommandMap/baseCommandMap');
const graphql        = require('graphql').graphql;
const graphqlSchema  = require('./Fbkt/graphqlSchema');

module.exports = (config, appLibs, getBaseCommandMap) => {
  const useConfig = config || {noConfig: true};
  __fbkt          = Fbkt(useConfig, appLibs);
  return __fbkt;
};

module.exports.baseCommandMap = baseCommandMap;

module.exports.queryGraphql = (graphQlQuery) => {
  return graphql(graphqlSchema(), graphQlQuery)
    .then(result => {
      if (result.errors && result.errors.length > 0) {
        Fbkt().clog('GRAPH QL QUERY ERRORS', result.errors, true);
      } else {
        return result.data;
      }
    })
    .catch(error => {
      Fbkt().clog('GRAPH QL QUERY ERROR', error, true);
      throw error;
    });
};


module.exports.clog      = require('./Fbkt/coreLibs/utility/fbktShortcuts/clog');
module.exports.clogError = require('./Fbkt/coreLibs/utility/fbktShortcuts/clogError');
