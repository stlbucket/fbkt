"use strict";
var _ = require('lodash');
let R = require('ramda');

module.exports = function(camel){
	var snake = {};

	_.forOwn(camel, function(value, key){
		if (R.is(Object, value) && R.is(Array, value)===false){
			snake[_.snakeCase(key)] = module.exports(value);
		} else {
			snake[_.snakeCase(key)] = value;
		}
	});

	return snake;
};