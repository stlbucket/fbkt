const R = require('ramda');
const Promise = require('bluebird');

class FbktConfig{
	constructor(target){
		if (!target){
			console.log('fbkt target not specified');
			process.exit();
		}

		this.target = target;
		this.app = R.split('.', target)[0];
		this.env = R.split('.', target)[1];
	}

	loadConfig(){
		console.log('LOADING FBKT TARGET', this.target);

		this.config = R.merge(
			require(`../../config/${this.app}`),
			require(`../../config/${this.app}/${this.env}`)
		);

		this.reportConfig();

		return this.config;
	}

	getConfigValue(key, defaultValue){
		// if (key.indexOf('Libs') > 0)
		// 	console.log('getConfigValue', key, _config[key]);
		const retval = this.config[key] || defaultValue;
		// if (key.indexOf('Libs') > 0)
		// 	console.log('retval', retval);
		return retval;
	}

	reportConfig(){
		console.log('==============FBKT CONFIG==============');
		console.log(this.config);
		console.log('============END FBKT CONFIG============');
	}

	getConfig(){
		let config = R.clone(this.config);
		if (config.dbAccess)
			delete config.dbAccess.connection.password;
		return config;
	}
};

let _config = null;

module.exports = (target)=>{
	if (R.is(Object, _config)) return _config;

	const tgt = target || process.argv[2];
	_config = new FbktConfig(tgt);
	_config.loadConfig();
	return _config;
};