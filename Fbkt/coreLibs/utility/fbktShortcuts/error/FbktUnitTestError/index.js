"use strict";
module.exports = function(errorData){
	var unitTestError = function(errorData){
		var self = this instanceof unitTestError ? this : null;

		if (self === null) {
			return new unitTestError;
		} else {
			self.name = 'FbktUnitTestError';
			self.errorData = errorData;
		}
	};

	unitTestError.prototype = new Error();
	unitTestError.prototype.constructor = unitTestError;

	return new unitTestError(errorData);
};