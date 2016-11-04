"use strict";
const uuid = require('node-uuid');
const fbkt = require('fbkt');
const should = require('should');

const pipeDef = require('./index');

describe(__filename, function () {

	it('UNNAMED PIPE TEST', function (done) {
		this.timeout(5000);

		const testId = uuid.v4();
		const user = {login: "who@cares.com"};
		const params = {
			testId: testId,
		};

		// const pipe = mixedPipe();
		// then pipe.execute(params)...
		// then fbkt().clog('PIPE WORKSPACE', pipe.ws, true);

		pipeDef({
			user:   user,
			params: params
		})
			.then((result)=> {
				fbkt().clog('PIPE RESULT', result, true);
				// result.testId.should.equal(testId);
				done();
			})
			.catch((error)=> {
				done(error);
			});

	});


});