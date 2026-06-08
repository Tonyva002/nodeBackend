const passport = require('passport');

function authenticateJwt(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: info ? info.message : 'Authentication failed',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = {
  authenticateJwt,
};
