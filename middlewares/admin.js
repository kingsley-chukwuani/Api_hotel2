module.exports = function (req, res, next) {
  if (!req.user || !req.user.roles) {
    return res.status(500).send('req.user or req.user.roles is undefined');
  }

  if (!req.user.roles.includes('admin')) {
    return res.status(403).send('Access denied.');
  }

  next();
};