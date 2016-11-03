let Promise = require('bluebird');
let Fbkt = require('./Fbkt');
let __fbkt = null;


module.exports = (config)=>{
	return Fbkt(config);
};


