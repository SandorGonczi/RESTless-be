const returnError = require("../models/returnError.model");
const selectExercises = require("../models/returnError.model")

exports.errorTest = (req, res, next) => {
    returnError().then((result)=>{
        res.status(200).send(result);
    }).catch(next);
}