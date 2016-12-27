module.exports = function(req, res, next) {


  var checkToken = oneTimePass.check(req.param('token'))

  sails.log('checkTokenService: '  + checkToken);

  if (checkToken || req.session.authenticated) {
    return next();
  }

  return res.redirect('/code')
};