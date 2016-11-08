const R = require('ramda');
const fbkt = require('../../../../Fbkt');
const fbktPassport = require('./fbktPassport');
const passport = require('passport');

const loginTokenHander = ()=>{
	const allHandlers = fbkt().getComponentFromAllLibs('fbktLoginToken');
	if (allHandlers.length > 1 ) throw fbkt().FbktCustomError('FbktLoginError', 'More than one fbktLoginToken handlers configured...');
	return allHandlers[0];
};

const loginUserHander = ()=>{
	const allHandlers = fbkt().getComponentFromAllLibs('fbktLoginUser');
	if (allHandlers.length > 1 ) throw fbkt().FbktCustomError('FbktLoginError', 'More than one fbktLoginUser handlers configured...');
	return allHandlers[0];
};


module.exports = {
	fbktPassport: function () {
		const loginToken = loginTokenHander();
		const loginUser = loginUserHander();

		if (R.is(Object, fbkt().app)) {
			fbkt().app.use(passport.initialize());
			// fbkt().clog("loginUser", loginUser);
			// fbkt().clog("loginToken", loginToken);
			fbktPassport(loginUser, loginToken);
		}
	}
};
