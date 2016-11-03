let colors = require('colors');
let R = require('ramda');
let __fbkt = null;

const Fbkt = class {
	constructor(config){
		this._config = config;
		this._coreLibs = require('./coreLibs');
		
		this.initShortcuts();
	}
	
	get config(){
		return this._config;
	}
	
	get coreLibs(){
		return this._coreLibs;
	}
	
	get libs(){
		return R.merge({}, this._coreLibs);
	}
	
	reportConfig(){
		this.clog('FBKT CONFIG', this.config, true);
	}

	getConfigValue(key, defaultValue){
		return this.config[key] || defaultValue;
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




const buildFbkt = (config)=>{
	if (R.is(Object, config))
		return __fbkt = new Fbkt(config);
	
	throw new Error('MUST SUPPLY CONFIG TO CREATE FBKT SERVER'.bgRed);
};

module.exports = (config)=>{
	if (R.is(Object, __fbkt)){
		return __fbkt;
	} else {
		return buildFbkt(config);
	}
};

