const express = require("express");
const { errorTest } = require("./controllers/errorTest.controller");
const { getExercises } = require("./controllers/exercises.controller");
const {
  getUserByUsernamePassword,
  getUserById,
  // patchUserById,
} = require("./controllers/users.controller");
const {
  getBodyParts,
  getEquipments,
  getTargets,
} = require("./controllers/filters.controller");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.get("/exercises", getExercises);
app.get("/api/users", getUserByUsernamePassword);
app.get("/api/exercises", getExercises);
app.get("/api/users/:userid", getUserById);
// app.patch("/api/users/:userid", patchUserById);

app.get("/api/errorhandling", errorTest);

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
