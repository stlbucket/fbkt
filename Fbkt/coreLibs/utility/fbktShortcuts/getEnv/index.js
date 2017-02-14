const Promise = require('bluebird');
const fbkt = require('../../../../../Fbkt');

require('dotenv-safe').load({
  allowEmptyValues: false,
  sample: './.env.example'
});

module.exports = (variableName) => {
  const d = Promise.defer();

  if (process.env[variableName]) {
    d.resolve(process.env[variableName]);
  } else {
    d.reject(fbkt().FbktCustomError('FbktMissingEnvError', `MISSING ENV: ${variableName}`));
  }

  return d.promise;
};