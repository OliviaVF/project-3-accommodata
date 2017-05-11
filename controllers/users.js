const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((info) => {
      if(!info) return res.notFound();

      res.json(info);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((info) => {
      if(!info) return res.notFound();

      return info.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  show: showRoute,
  delete: deleteRoute
};
