module.exports = function(req, res, next) {
  req.wilson.tags.brand = 'wilson';
  next();
};