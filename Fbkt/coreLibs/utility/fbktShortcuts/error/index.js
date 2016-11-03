"use strict";
var _ = require('lodash');
var fbkt = require('../../../../../Fbkt');
var when = require('when');

var FbktError = require('./FbktError');

var errHandler = function(errorInfo){
	var self = this;
	self.errorInfo = errorInfo;

	self.go = function(){
		// fbkt().clog('THE ERROR', errorInfo.error.stack, true);
		// process.exit();
		
		if (_.isError(self.errorInfo.error) && _.isObject(self.errorInfo.error.logEntry))
		{
			
			return when(self.errorInfo.error);
		} else {
			var stack = self.errorInfo.stack || 'NO STACK TRACE';
			stack = stack.split("'").join('"').split('\n');

			var source = self.errorInfo.source ? self.errorInfo.source.split("'").join('"') : 'NO SOURCE';
			
			var message = 'NO MESSAGE';
			if (self.errorInfo.message){
				message = self.errorInfo.message.split("'").join('"');
			} else if (self.errorInfo.error){
				message = self.errorInfo.error.toString().split("'").join('"');
				stack = self.errorInfo.error.stack.split("'").join('"').split('\n');
			}
			
			self.fbktErrorType = self.errorInfo.error.name.indexOf('Fbkt') === 0 ? self.errorInfo.error.name : 'FbktError';
			
			self.logEntry = {
				logCategory:    self.errorInfo.logCategory || self.fbktErrorType,
				logLevel:       'ERROR',
				source:         source,
				message:        message,
				attributesJson: {
					stack: 			stack,
					callInfo:   _.isObject(self.errorInfo.callInfo) ? {
						user:	self.errorInfo.callInfo.user,
						params:	self.errorInfo.callInfo.params
					} : 'NO CALL INFO',
					workspace:	self.errorInfo.workspace || 'NO WORKSPACE',
					errorData:	self.errorInfo.error.errorData || 'NO ERROR DATA'
				}
			};

			return when(FbktError(self.logEntry, self.fbktErrorType));
			// if (self.errorInfo.suppressLog === true) {
			// 	return when(FbktError(self.logEntry, self.fbktErrorType));
			// } else {
			// 	// fbkt().clog('LOGGING THIS ERROR', self.logEntry);
			// 	return fbkt().fbktLog({
			// 		params: self.logEntry
			// 	})()
			// 		.then(function (dbLogEntry) {
			// 			// fbkt().clog('FBKT ERROR LOG ENTRY', dbLogEntry);
			// 			return new FbktError(dbLogEntry, self.fbktErrorType);
			// 		})
			// 		.catch(function(loggingError){
			// 			console.log('==================UNABLE TO LOG===================')
			// 			return new FbktError(self.logEntry, self.fbktErrorType);
			// 		});
			// }
		}
	};
	
	return self.go;
};

module.exports = function(errorInfo){
	return new errHandler(errorInfo)();
};