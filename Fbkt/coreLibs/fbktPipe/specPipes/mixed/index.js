"use strict";
const Promise = require('bluebird');
const axios = require('axios');

const fbkt = require('../../../../../Fbkt');
const oneStep = require('../oneStep');
const multiStep = require('../multiStep');
const isItReallyFunctional = require('./isItReallyFunctional');

module.exports = (callInfo)=>{
	return fbkt().FbktPipe({
		name:				'mixedPipeline',
		filename: __filename,
		displayProperties : {
			dummyProperty : "Proper-property PROPER"
		},
		pipelineParams:	{
			isItFunctional:	'oneStep.isItFunctional',
			isItReallyFunctional:	'isItReallyFunctional',
			aFunctionSaid:	'aFunctionSaysWhat',
			stockQuote:			'getAStockQuote'
		},
		expectedParams:	{
			testId:					'uuid'  // not yet applied
		},
		pipelineSteps: {
			"oneStep":							oneStep(),
			"isItReallyFunctional":	isItReallyFunctional(),
			"multiStep":						multiStep(),
			"aFunctionSaysWhat":	function() {
				var d = Promise.pending();
				setTimeout(function () {
					d.resolve('WHAT');
				}, 1000);
				return d.promise;
			},
			"getAStockQuote":	function(callInfo){
				return axios.get(`http://marketdata.websol.barchart.com/getQuote.json?key=b730fc1743f8620edd18553584ebb1da&symbols=${callInfo.params.stockSymbol}`)
					.then((result)=>{
						return result.data.results[0];
				});
			},
			"caresAboutWhatAFunctionSays":	function(callInfo){
				return {
					testId:				callInfo.params.testId,
					isItReallyFunctional:		callInfo.params.isItReallyFunctional,
					statement: 'I really care.  I do.  A FUNCTION SAID::: "' + callInfo.params.aFunctionSaid + '"',
					stockResult:		`${callInfo.params.stockSymbol}:  ${callInfo.params.stockQuote.lastPrice}`
				};
			}
		}
	}, callInfo);
};
