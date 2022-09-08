const {
  selectBodyParts,
  selectEquipments,
  selectTargets,
} = require("../models/filters.model");

exports.getBodyParts = (req, res, next) => {
  selectBodyParts()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.getEquipments = (req, res, next) => {
  selectEquipments()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.getTargets = (req, res, next) => {
  selectTargets()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};
