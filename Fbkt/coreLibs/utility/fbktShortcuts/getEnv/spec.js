'use strict';
const expect = require('chai').expect;
const moment = require('moment');
const util   = require('util');
const _ = require('lodash');

const target = require('./index');

describe('getEnv', () => {
  it('find NODE_ENV', function(done){
    target('NODE_ENV')
      .then(nodeEnv => {
        expect(nodeEnv).to.equal('test');
        done();
      })
  });

  it('not find missing env variable', function(done){
    target('badEnv')
      .then(value => {
        done(`Expected error but go value: ${value}`)
      })
      .catch(expectedError => {
        // expect(expectedError).to.be.an('error');
        expect(_.isError(expectedError)).to.equal(true);
        done();
      });
  });
});
