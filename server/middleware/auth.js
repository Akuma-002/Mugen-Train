const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header missing or malformed');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received token:', token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    console.log('JWT payload:', payload);
    req.userId = payload.id;
    next();
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
