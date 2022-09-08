const { selectWorkoutsByUsername } = require("../models/workouts.model");

exports.getWorkoutsByUsername = (req, res, next) => {
  const userName = req.params.username;
  selectWorkoutsByUsername(userName)
    .then((workouts) => {
      res.status(200).send({ workouts: workouts });
    })
    .catch(next);
};
