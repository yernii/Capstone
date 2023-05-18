const jwt = require('jsonwebtoken');

const checkAuthHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Invalid authorization header.' });
  }

  if (parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization header type.' });
  }

  const token = parts[1];
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded;

    next();
  });
};

module.exports = checkAuthHeader;