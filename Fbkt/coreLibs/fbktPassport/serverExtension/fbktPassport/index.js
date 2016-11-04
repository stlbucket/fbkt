var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
//JDS: 2016-01-06 PASSPORT DOESN'T SUPPORT BASIC AUTH OVERRIDES, CODE BELOW TO MITIGATE, BASIC WWW-Authenticate forces a browser to attempt a HTTP authorization (a popup), this prevents that, DO NOT REMOVE - may need to be moved
BasicStrategy.prototype._challenge = function() {
  return 'x-Basic realm="' + this._realm + '"';
};

var fbkt = require('../../../../../Fbkt');
var TokenStrategy = require('./ext/passport/token.js');
var cryptojs = require('crypto-js');


module.exports = function(basicLoginHandler, tokenLoginHandler){

	var testUser = fbkt().getConfigValue('defaultTestUser');
	//console.log('spoofing user:', testUser);
	
	var setupBasicStrategy = function(options) {
		passport.use(
			new BasicStrategy(
				//{ xhrCallengeType: 'x-Basic' },
				function (username, password, done) {
					basicLoginHandler(username, password)
						.then(function (dbUser) {
							return done(null, dbUser);
						})
						.catch(function (error) {
							return done(null, false, error);
						});
				})
		);
	};


	var setupTokenStrategy = function(options) {
		options = options || {};
		//console.log('SETUP TOKEN LOGIN', options);
		//process.exit();
		passport.use(
			new TokenStrategy({
					token: options.token
				},
				function (loginToken, done) {
					// fbkt().clog('TOGEN LOGIN', loginToken);
					// fbkt().clog('tokenLoginHandler', tokenLoginHandler);
					tokenLoginHandler({
						user: {
							token: loginToken
						}
					})
						.then(function (authenticatedUser) {
							//if(!authenticatedUser.id){
							//	fbkt().clog("AuthenticatedUser", authenticatedUser);
							//}
							return done(null, authenticatedUser);
						})
						.catch(function (error) {
							return done(null, false, error);
						});
				})
		);
	};

	setupBasicStrategy();
	if (testUser && testUser.enable === true) {
		basicLoginHandler({
			params:	{
				login: testUser.login,
				hashedPassword: cryptojs.SHA256(testUser.password).toString(cryptojs.enc.Base64)
			}
		})()
			.then(function(authenticatedUser){
				console.log('SPOOFING TEST USER: ', authenticatedUser);
				setupTokenStrategy(authenticatedUser);
			})
			.catch(function(error){
				fbkt().clog('ERROR SPOOFING TEST USER', error, true);
			});
	} else{
		setupTokenStrategy();
	}

	fbkt().app.use(passport.initialize());
	fbkt().controllerAuth = {
		tokenAuth:	passport.authenticate('token', {session: false}),
		basicAuth:	passport.authenticate('basic', {session: false})
	}
};


