const router = require('express').Router();
const info = require('../controllers/info');
const users = require('../controllers/users');
const resources = require('../controllers/resources');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

router.route('/info')
  .get(info.index)
  .post(secureRoute, info.create);

router.route('/info/:id')
  .get(secureRoute, info.show)
  .delete(secureRoute, info.delete)
  .put(secureRoute, info.update);

router.route('/resources')
  .get(resources.index);

router.route('/users/:id')
  .get(users.show)
  .delete(secureRoute, users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

// router
//   .post('/register', auth.controller)
//   .post('/login', auth.controller)
//   .post('/auth/facebook', oauth.facebook);

router.all('/*', (req, res) => res.notFound());

// Facebook login




module.exports = router;
