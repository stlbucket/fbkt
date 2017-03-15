require('./loadEnv');
let __fbkt = null;
const Fbkt = require('./Fbkt');
const baseCommandMap = require('./Fbkt/coreLibs/fbktServer/resolveCommandMap/baseCommandMap');
const graphql = require('graphql').graphql;
const graphqlSchema = require('./Fbkt/graphqlSchema');

module.exports = (config, appLibs, getBaseCommandMap)=>{
  const useConfig = config || { noConfig: true };
  __fbkt = Fbkt(useConfig, appLibs);
  return __fbkt;
};

module.exports.baseCommandMap = baseCommandMap;

module.exports.queryGraphql = (graphQlQuery) => {
  return graphql(graphqlSchema(), graphQlQuery)
    .then(result => {
      return result.data;
    });
};


module.exports.clog      = require('./Fbkt/coreLibs/utility/fbktShortcuts/clog');
module.exports.clogError = require('./Fbkt/coreLibs/utility/fbktShortcuts/clogError');
