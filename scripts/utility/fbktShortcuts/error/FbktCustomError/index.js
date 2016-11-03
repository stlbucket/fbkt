"use strict";
function NewFbktError(fbktErrorType, errorData) {
	Error.captureStackTrace(this);
	this.errorData = errorData;
	this.name = fbktErrorType;
}
NewFbktError.prototype = Object.create(Error.prototype);

module.exports = function(fbktErrorType, errorData){
	return new NewFbktError(fbktErrorType, errorData);
};