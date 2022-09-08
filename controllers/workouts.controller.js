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
  const { workout_name, rest_timer, exercises } = req.body;
  const workoutName = workout_name;
  const restTimer = rest_timer;
  console.log(workoutName);
  console.log(restTimer);
  insertWorkoutByUsername(userName, workoutName, restTimer, exercises)
    .then((workout) => {
      res.status(201).send({ workout });
    })
    .catch(next);
};
