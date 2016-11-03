"use strict";
var uuid = require('node-uuid');
var util = require('util');
var should = require('should');

var fbkt = require('../../../../../Fbkt');

describe(__filename, function () {
	it('snake_case and camelCase an object', function(done){
		var camel = {
			oneField: 'one',
			twoField: 'two',
			theObject: {
				theField: 'theValue'
			}
		};
		
		var snake = fbkt().object.snakeCase(camel);
		snake.should.be.ok;
		snake.one_field.should.be.ok;
		snake.two_field.should.be.ok;
		
		var camel2 = fbkt().object.camelCase(snake);
		camel2.should.be.ok;
		camel2.oneField.should.equal(camel.oneField);

		fbkt().clog('SNAKE', snake, true);
		fbkt().clog('CAMEL2', camel2, true);

		done();
	});
});