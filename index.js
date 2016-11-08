let Promise = require('bluebird');
let Fbkt = require('./Fbkt');
let __fbkt = null;
const baseCommandMap = require('./Fbkt/coreLibs/fbktServer/resolveCommandMap/baseCommandMap');

module.exports = (config, appLibs, getBaseCommandMap)=>{
  const useConfig = config || { noConfig: true };
  const command = process.argv[3] || 'runServer';
  __fbkt = Fbkt(useConfig, appLibs);
  __fbkt.runServer(command);
};

module.exports.baseCommandMap = baseCommandMap;