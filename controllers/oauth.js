const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/environment').secret;

function facebook(req, res, next) {
  rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      code: req.body.code,
      client_id: oauth.facebook.clientId,
      client_secret: oauth.facebook.clientSecret,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {
    console.log('Getting accessToken', accessToken);
    //request user's profile with accessToken
    return rp.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });

  }).then((profile) => {
    return User
      .findOne({ email: profile.email })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.name,
            email: profile.email
          });
        }
        user.facebookId = profile.id;

        return user.save();
      });
  })
  .then((user) => {
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
    return res.json({
      token,
      message: `Welcome back ${user.username}!`
    });
  })
  .catch(next);
}

module.exports = { facebook };
