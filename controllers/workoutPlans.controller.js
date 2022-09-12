const { fetchWorkoutPlans } = require("../models/workoutPlans.models");

exports.getWorkoutPlans = (req, res, next) => {
  fetchWorkoutPlans()
    .then((workoutPlans) => {
      res.status(200).send({ workoutPlans });
    })
    .catch(next);
};
