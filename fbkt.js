"use strict";
var _fbkt = null;


module.exports = (fbkt)=>{
	if (fbkt){
		_fbkt = fbkt === 'DESTROY' ? null : fbkt;
	}
	return _fbkt;
};