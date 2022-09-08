const express = require("express");

//Controller Imports
const { getExercises } = require("./controllers/exercises.controller");
const {
  getWorkoutsByUsername,
  postWorkoutByUsername,
  patchWorkoutByUsername,
} = require("./controllers/workouts.controller");
const { getWorkoutPlans } = require("./controllers/workoutPlans.controller");
const {
  getUserByUsernamePassword,
  postNewUser,
} = require("./controllers/users.controller");
const {
  getBodyParts,
  getEquipments,
  getTargets,
} = require("./controllers/filters.controller");

const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(express.json());

app.use(cors());

// Exercises calls
app.get("/api/exercises", getExercises);
app.get("/api/exercises", getExercises);

app.post("/api/users", postNewUser);

// Users calls
app.get("/api/users", getUserByUsernamePassword);

// Workouts calls
app.get("/api/workouts/:username", getWorkoutsByUsername);
app.post("/api/workouts/:username", postWorkoutByUsername);
app.patch("/api/workouts/:username", patchWorkoutByUsername);

// Workoutplan calls
app.get("/api/workoutplans", getWorkoutPlans);

// Filter calls
app.get("/api/bodyparts", getBodyParts);
app.get("/api/equipment", getEquipments);
app.get("/api/target", getTargets);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "bad path!" });
});

//ERROR PATH

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res) => {
  res.status(500).send({ msg: "500 - Internal server error" });
});

const server = app.listen(port, (err) => {
  if (err) throw err;
  //console.log(`RESTless back end app listening on port ${port}!`)
});

module.exports = { app, server };
