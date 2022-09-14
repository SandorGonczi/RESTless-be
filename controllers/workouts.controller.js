const {
  selectWorkoutsByUsername,
  insertWorkoutByUsername,
  updateWorkoutByUsername,
  removeWorkoutByUsername,
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
  insertWorkoutByUsername(userName, workoutName, restTimer, exercises)
    .then((workout) => {
      res.status(201).send({ workout });
    })
    .catch(next);
};

exports.patchWorkoutByUsername = (req, res, next) => {
  const userName = req.params.username;
  const { _id, workout_name, rest_timer, exercises } = req.body;
  const workoutName = workout_name;
  const restTimer = rest_timer;
  const id = _id;

  updateWorkoutByUsername(id, userName, workoutName, restTimer, exercises)
    .then((workout) => {
      res.status(200).send({ workout });
    })
    .catch(next);
};

// exports.deleteWorkoutsByUsername = (req, res, next) => {
//   const userName = req.params.username;
//   const { workout_name } = req.body;
//   const workoutName = workout_name;

//   removeWorkoutByUsername(userName, workoutName)
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch(next);
// };
