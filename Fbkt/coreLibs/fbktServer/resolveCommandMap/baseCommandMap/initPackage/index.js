var _ = require('lodash');
var fbkt = require('../../../../../../Fbkt');
var argv = require('minimist')(process.argv.slice(2));

module.exports = function(){
  console.log('initPackage', argv); process.exit();

	return fbkt().libs.devSupport.initPackage();
};
