"use strict";
var cryptoJS = require('crypto-js');

module.exports = function(thingToEncrypt){
	return cryptoJS.SHA256(thingToEncrypt).toString(cryptoJS.enc.Base64);
};