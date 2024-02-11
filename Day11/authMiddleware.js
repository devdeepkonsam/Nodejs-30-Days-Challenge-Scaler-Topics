const jwt = require('jsonwebtoken');
const key = 'your-secret';

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
      return res.status(401).send("Error no token provided")
    }
    jwt.verify(token, key, (err, decoded) => {
     if(err) {
       return res.status(500).send('Failed to authenticate.');
      }
      req.user = decoded;
      console.log('User authenticated:', decoded);
      next();
    });
}

module.exports = authenticationMiddleware;