const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access denied. No token provided or token format is incorrect.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.user.roles = req.user.roles || ['user', 'admin']; 
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;