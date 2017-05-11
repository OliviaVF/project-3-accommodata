module.exports = {
  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    profileURL: '#',
    clientId: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    scope: 'user:email'
  }
};
