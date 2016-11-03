"use strict";
var cryptoJS = require('crypto-js');

module.exports = function(thingToEncrypt){
	return cryptoJS.SHA3(thingToEncrypt).toString(cryptoJS.enc.Base64);
};