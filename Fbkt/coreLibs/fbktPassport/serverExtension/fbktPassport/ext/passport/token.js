
/**
 * Module dependencies.
 */
var passport = require('passport')
  , util = require('util');

/**
 * `TokenStrategy` constructor.
 *
 * The Token authentication strategy authenticates requests based on
 * login token credentials contained in the `Authorization` header
 * field.
 *
 * Applications must supply a `verify` callback which accepts `loginToken`, 
 * and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the authentication realm.
 *
 * Options:
 *   - `realm`  authentication realm, defaults to "Users"
 *
 * Examples:
 *
 *     passport.use(new TokenStrategy(
 *       function(loginToken, done) {
 *         User.findOne({ loginToken: loginToken }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function TokenStrategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) throw new Error('Token authentication strategy requires a verify function');
  
  passport.Strategy.call(this);
  this.name = 'token';
  this._defaultTestUserToken = options.token;
  this._verify = verify;
  this._realm = options.realm || 'Users';
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(TokenStrategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a Token authorization
 * header.
 *
 * @param {Object} req
 * @api protected
 */
TokenStrategy.prototype.authenticate = function(req) {
  // console.log("HEADERS", req.headers);
  //JDS: 2016-04-14: Added req.query for allowable inclusion of tokens in the URL.  This allows more flexible gets for file downloads
  var authorization = req.headers['authorization'] || req.query['authorization'];
  authorization = authorization || this._defaultTestUserToken;
// console.log('authorization', authorization);
  if (!authorization) { return this.fail(this._challenge()); }

  var self = this;
  
  function verified(err, user) {
    if (err) { return self.error(err); }

    if (!user || user instanceof Error === true) {
			return self.fail(self._challenge());
    }
    self.success(user);
  }
  
  if (self._passReqToCallback) {
    this._verify(req, authorization, verified);
  } else {
    this._verify(authorization, verified);
  }
};

/**
 * Authentication challenge.
 *
 * @api private
 */
TokenStrategy.prototype._challenge = function() {
  return 'Token realm="' + this._realm + '"';
}


/**
 * Expose `TokenStrategy`.
 */ 
module.exports = TokenStrategy;
