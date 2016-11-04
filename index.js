let Promise = require('bluebird');
let Fbkt = require('./Fbkt');
let __fbkt = null;
const baseCommandMap = require('./Fbkt/coreLibs/fbktServer/resolveCommandMap/baseCommandMap');

module.exports = (config, appLibs, getBaseCommandMap)=>{
	return getBaseCommandMap ? baseCommandMap : Fbkt(config, appLibs);
};