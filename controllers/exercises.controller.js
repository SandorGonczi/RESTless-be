const selectExercises = require("../models/exercises.model")

exports.getExercises = (req, res, next) => {
    selectExercises().then((result)=>{
        res.status(200).send(result);
    }).catch(next);
}