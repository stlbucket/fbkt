"use strict";
// require("nodejs-dashboard");
var fbkt = require('./scripts');

var command = process.argv[3] || 'runServer';

fbkt.fbktServer(command);