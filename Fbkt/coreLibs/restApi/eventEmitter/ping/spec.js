"use strict";
const should = require('should');
const uuid = require('uuid')
const fbkt = require('../../../../../Fbkt');

const target = require('./index')();

describe(__filename, function () {

  it('CHECKS FOR SOMETHING', function (done) {
    const testId = uuid.v4();
    fbkt().clog('PING EMITTER', target, true);

    target.on('PING_ONE', (e)=>{
      fbkt().clog('EVENT FIRED', e, true);
      done();
    });

    target.emit('PING_ONE', testId);
  });


});