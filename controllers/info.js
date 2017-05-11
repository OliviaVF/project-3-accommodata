const Info = require('../models/info');

function indexRoute(req, res, next) {
  Info
    .find(req.query)
    .exec()
    .then((info) => res.json(info))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Info
    .create(req.body)
    .then((info) => res.status(201).json(info))
    .catch(next);
}

function showRoute(req, res, next) {
  Info
    .findById(req.params.id)
    .exec()
    .then((info) => {
      if(!info) return res.notFound();

      res.json(info);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Info
    .findById(req.params.id)
    .exec()
    .then((info) => {
      if(!info) return res.notFound();

      for(const field in req.body) {
        info[field] = req.body[field];
      }

      return info.save();
    })
    .then((info) => res.json(info))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Info
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
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
