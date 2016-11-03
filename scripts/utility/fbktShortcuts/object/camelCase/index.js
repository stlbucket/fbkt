"use strict";
const R = require('ramda');
const _ = require('lodash');

module.exports = function (snake){
	switch(R.type(snake)){
		case "Object": {
			return R.reduce((acc, snakeKey)=>{
				return R.merge(acc, {
					[_.camelCase(snakeKey)]:	module.exports(snake[snakeKey])
				})
			}, {}, R.keys(snake));
		}
		case "Array":	{
			return R.map(module.exports, snake);
		}
		default:
			return snake
	}
};