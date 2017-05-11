const Service = require('../models/resource');

function indexRoute(req, res, next) {
  Service
    .find()
    .exec()
    .then((resource) => res.json(resource))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
