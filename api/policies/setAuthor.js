module.exports = function setAuthor(req, res, next) {

  console.log('apina');
  req.options.values = req.options.values || {};
  req.options.values.name = req.user;
  return next();

};