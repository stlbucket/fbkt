"use strict";

const EventEmitter = require('events');

class FbktEmitter extends EventEmitter {}

module.exports = new FbktEmitter();
