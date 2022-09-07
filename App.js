const express = require("express");
const { errorTest } = require("./controllers/errorTest.controller");
const { getExercises } = require("./controllers/exercises.controller");
const {
  getUserByUsernamePassword,
  getUserById,
} = require("./controllers/users.controller");
const app = express();
const port = process.env.PORT || 3000;

app.get("/exercises", getExercises);
app.get("/api/users", getUserByUsernamePassword);
app.get("/api/exercises", getExercises);
app.get("/api/users/:userid", getUserById);

app.get("/api/errorhandling", errorTest);

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
