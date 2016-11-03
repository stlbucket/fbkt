"use strict";

// see sample test output and workspace at bottom of file

var uuid = require('node-uuid');
var fbkt = require('../../../../../Fbkt');
var should = require('should');
const R = require("ramda");

const pipeDef = require('./index');

describe(__filename, function() {

	it('multi-step pipe - explicit execute', function (done) {
		const testId = uuid.v4();
		const user = {login: "who@cares.com"};
		const params = {
			testId: testId,
			input:  "THIS IS FUNCTION BUCKET"
		};

		const pipe = pipeDef();

		pipe.execute({
			user:   user,
			params: params,
			recordPipe:	true
		})
			.then(function (result) {
				fbkt().clog('MULTI-STEP PIPE WORKSPACE', pipe.ws, true);
				fbkt().clog('EXPLICIT EXECUTE MULTI-STEP PIPE RESULT', result, true);
				result.testId.should.equal(testId);
				done();
			});

	});

	it('multi-step pipe - implicit execute', function (done) {
		const testId = uuid.v4();
		const user = {login: "who@cares.com"};
		const params = {
			testId: testId,
			input:  "THIS IS FUNCTION BUCKET"
		};

		pipeDef({
			user:   user,
			params: params
		})
			.then(function (result) {
				fbkt().clog('IMPLICIT EXECUTE MULTI-STEP PIPE RESULT', result, true);
				result.testId.should.equal(testId);
				done();
			});

	});


	it('multi-step pipe - curried execute', function (done) {
		const testId = uuid.v4();
		const altTestId = uuid.v4();
		const user = {login: "who@cares.com"};
		const params = {
			testId: testId,
			input:  "THIS IS FUNCTION BUCKET"
		};

		const pipe = R.curry(pipeDef);

		pipe({
			user:   user,
			params: params
		})
			.then(function (result) {
				fbkt().clog('CURRIED EXECUTE MULTI-STEP PIPE RESULT 1', result, true);
				result.testId.should.equal(testId);
				params.testId = altTestId;
				return pipe({
					user:   user,
					params: params
				})
			})
			.then(function (result) {
				fbkt().clog('CURRIED EXECUTE MULTI-STEP PIPE RESULT 2', result, true);
				result.testId.should.equal(altTestId);
				done();
			});
	});

});

// 


// D:\git\fbkt\scripts\core\fbktPipe\specPipes\multiStep\spec.js
// ~~~~~~~~~~~~ MULTI-STEP PIPE WORKSPACE ~~~~~~~~~~~~
// { user: { login: 'who@cares.com' },
// 	params:
// 				{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 					input: 'THIS IS FUNCTION BUCKET' },
// 	uid: '43b4c413-0fa4-45c1-aa50-adb0370809f9',
// 	name: 'multiStepPipe',
// 	parentPipeName: 'NO_PARENT',
// 	pipelineSteps:
// 	{ oneStep:
// 	{ momentFormatString: 'YYYY-MM-DD HH:mm:ss:SSSS',
// 		fbktPipe:
// 												{ name: 'simpleOneStepFbktPipeline',
// 													filename: 'D:\\git\\fbkt\\scripts\\core\\fbktPipe\\specPipes\\oneStep\\index.js',
// 													expectedParams: { testId: 'uuid' },
// 													pipelineParams: { stepOneCallTime: 'stepOne.callTime' },
// 													pipelineSteps: {} },
// 		pipelineSteps: {} } },
// 	expectedParams: { testId: 'uuid' },
// 	pipelineParams: { stepOneMessage: 'stepOne.message' },
// 	pipelineParamValues: { stepOneMessage: 'Message from step 1' },
// 	stepMetrics:
// 	{ stepOne:
// 	{ startTimestamp: '2016-09-28 14:49:28:9150',
// 		endTimestamp: '2016-09-28 14:49:28:9150' },
// 		stepTwo:
// 	{ startTimestamp: '2016-09-28 14:49:28:9150',
// 		endTimestamp: '2016-09-28 14:49:28:9150' },
// 		oneStep:
// 	{ startTimestamp: '2016-09-28 14:49:28:9150',
// 		endTimestamp: '2016-09-28 14:49:28:9150' } },
// 	stepResults:
// 	{ stepOne:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		message: 'Message from step 1' },
// 		stepTwo:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		message: 'Got message from step 1...  Message from step 1' },
// 		oneStep:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		callTime: '49.28.9150',
// 		isItFunctional: 'close enough for javascript work!' } },
// 	stepResultsDeep:
// 	{ stepOne:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		message: 'Message from step 1' },
// 		stepTwo:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		message: 'Got message from step 1...  Message from step 1' },
// 		oneStep:
// 	{ stepOne:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		callTime: '49.28.9150',
// 		isItFunctional: 'close enough for javascript work!' } } },
// 	exitProcessOnError: false,
// 	finalResult:
// 	{ testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 		callTime: '49.28.9150',
// 		isItFunctional: 'close enough for javascript work!' },
// 	dbRecord: 'NO DATABASE RECORD' }
// ____________ END MULTI-STEP PIPE WORKSPACE ____________


// ~~~~~~~~~~~~ EXPLICIT EXECUTE MULTI-STEP PIPE RESULT ~~~~~~~~~~~~
// { testId: '83beafd5-2a58-4ee3-bd16-edda6a7188f3',
// 	callTime: '49.28.9150',
// 	isItFunctional: 'close enough for javascript work!' }
// ____________ END EXPLICIT EXECUTE MULTI-STEP PIPE RESULT ____________
// √ multi-step pipe - explicit execute

// ~~~~~~~~~~~~ IMPLICIT EXECUTE MULTI-STEP PIPE RESULT ~~~~~~~~~~~~
// { testId: '4a5a50f8-fc18-4ba9-bf97-bb25c7846a45',
// 	callTime: '49.28.9620',
// 	isItFunctional: 'close enough for javascript work!' }
// ____________ END IMPLICIT EXECUTE MULTI-STEP PIPE RESULT ____________
// √ multi-step pipe - implicit execute

// ~~~~~~~~~~~~ CURRIED EXECUTE MULTI-STEP PIPE RESULT 1 ~~~~~~~~~~~~
// { testId: 'e30b3e30-bedb-43a5-b6ca-53a72f4ef477',
// 	callTime: '49.28.9780',
// 	isItFunctional: 'close enough for javascript work!' }
// ____________ END CURRIED EXECUTE MULTI-STEP PIPE RESULT 1 ____________

// ~~~~~~~~~~~~ CURRIED EXECUTE MULTI-STEP PIPE RESULT 2 ~~~~~~~~~~~~
// { testId: '4db3025c-0c63-496d-83c5-d914ba3811f9',
// 	callTime: '49.28.9930',
// 	isItFunctional: 'close enough for javascript work!' }
// ____________ END CURRIED EXECUTE MULTI-STEP PIPE RESULT 2 ____________