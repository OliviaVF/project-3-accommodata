const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ username: req.body.username })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      // generate a JWT and send it to the client
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24hr' }); //after an hour token becomes invalid and user has to log back in again
      res.json({ token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}
  
module.exports = {
  register,
  login
};
