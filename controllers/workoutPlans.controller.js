const { fetchWorkoutPlans } = require("../models/workoutPlans.models");

exports.getWorkoutPlans = (req, res, next) => {
  fetchWorkoutPlans()
    .then((workoutPlans) => {
      console.log(workoutPlans, " in controler before send");
      res.status(200).send({ workoutPlans });
    })
    .catch(next);
};
