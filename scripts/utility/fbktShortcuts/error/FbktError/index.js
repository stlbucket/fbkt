"use strict";
function FbktError(logEntry, fbktErrorType) {
	this.name = fbktErrorType || 'FbktError';
	this.logEntry = logEntry;
	// this.stack = (new Error()).stack;
};

FbktError.prototype = Object.create(Error.prototype);
FbktError.prototype.constructor = FbktError;

module.exports = function(logEntry, fbktErrorType){
	return new FbktError(logEntry, fbktErrorType);
};
