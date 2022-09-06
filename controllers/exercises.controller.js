const selectExercises = require("../models/exercises.model");

exports.getExercises = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  const bodyPart = req.query.body_part;
  const equipment = req.query.equipment;
  const target = req.query.target;
  const id = req.query.id;

  const validQueries = [
    "sort_by",
    "order",
    "filter",
    "body_part",
    "equipment",
    "target",
    "id",
  ];
  if (Object.keys(req.query).length != 0) {
    for (query in req.query) {
      if (!validQueries.includes(query)) {
        res.status(400).send({ msg: "Bad Request" });
      }
    }
  }

  selectExercises(sortBy, order, bodyPart, equipment, target, id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};
