const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/helpers/index.js');

const router = express.Router();

const generateToken = user => {
  const jwtPayload = {
    ...user,
    hello: 'FSW13',
    roles: ['admin', 'root'],
  };

  const jwtSecret = 'how.now.brown.cow.!';

  const jwtOptions = {
    expiresIn: '1m',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

router.post('/', (req, res) => {
  const creds = req.body;

  db.loginUser(creds)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({
          message: `You shall not pass... as you are not authenticated.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
