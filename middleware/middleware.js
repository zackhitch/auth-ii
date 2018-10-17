const jwt = require('jsonwebtoken');
const jwtSecret = 'how.now.brown.cow.!';

module.exports = {
  protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          // token verification failed
          res.status(401).json({ message: `invalid token` });
        } else {
          // token is valid
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: `No token provided. (Say YOURE NOT AUTHORIZED)` });
    }
  },
};
