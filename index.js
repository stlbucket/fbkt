require('./loadEnv');
let __fbkt = null;
const Fbkt = require('./Fbkt');
const baseCommandMap = require('./Fbkt/coreLibs/fbktServer/resolveCommandMap/baseCommandMap');

module.exports = (config, appLibs, getBaseCommandMap)=>{
  const useConfig = config || { noConfig: true };
  __fbkt = Fbkt(useConfig, appLibs);
  return __fbkt;
};

module.exports.baseCommandMap = baseCommandMap;
