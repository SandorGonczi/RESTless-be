const {
  selectWorkoutsByUsername,
  insertWorkoutByUsername,
} = require("../models/workouts.model");

exports.getWorkoutsByUsername = (req, res, next) => {
  const userName = req.params.username;
  selectWorkoutsByUsername(userName)
    .then((workouts) => {
      res.status(200).send({ workouts: workouts });
    })
    .catch(next);
};

exports.postWorkoutByUsername = (req, res, next) => {
  const userName = req.params.username;
  insertWorkoutByUsername(userName)
    .then((workout) => {
      res.status(200).send({ workout: workout });
    })
    .catch(next);
};
