"use strict";
const clog = require('../clog');

module.exports = function(sectionIdentifier, logItem, verbose){
  clog(sectionIdentifier, logItem, verbose, 'red');
};