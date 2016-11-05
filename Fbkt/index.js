let colors = require('colors');
let R = require('ramda');
let __fbkt = null;

const Fbkt = class {
	constructor(config, appLibs){
		this._config = config;
		this._coreLibs = require('./coreLibs');
		this._appLibs = appLibs || [];
		
		this._allLibs = R.merge(this._coreLibs, this._appLibs);
		
		this.initShortcuts();
	}
	
	get config(){
		return this._config;
	}
	
	get libs(){
		return this._allLibs;
	}
	
	
	reportConfig(){
		this.clog('FBKT CONFIG', this.config, true);
	}

	getConfigValue(key, defaultValue){
		return this._config[key] || defaultValue;
	}
	
	runServer(command){
		return this._coreLibs.fbktServer.runServer(command);
	}

	getComponentFromAllLibs(componentName){
		return R.reduce(
			(allComponents, lib)=> {
				const libComponents = lib[componentName] || [];
				return allComponents.concat(libComponents);
			},
			[],
			R.values(this.libs)
		);
	}
	
	initShortcuts(){
		const allShortCuts = this.getComponentFromAllLibs('fbktShortcuts');

		R.forEach(
			(libShortCuts)=>{
				R.forEach(
					(key)=>{
						this[key] = libShortCuts[key];
					},
					R.keys(libShortCuts)
				)
			},
			allShortCuts
		);
		
	}
};




const buildFbkt = (config, appLibs)=>{
	if (R.is(Object, config))
		return __fbkt = new Fbkt(config, appLibs);
	
	throw new Error('MUST SUPPLY CONFIG TO CREATE FBKT SERVER'.bgGreen);
};

module.exports = (config, appLibs)=>{
	if (R.is(Object, __fbkt)){
		return __fbkt;
	} else {
		return buildFbkt(config, appLibs);
	}
};

