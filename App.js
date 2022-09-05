const express = require("express");
const { getExercises } = require("./controllers/exercises.controller");
const app = express();
const port = process.env.PORT || 3000;

const run = require("./db/connection");

app.get(["/exercises"], getExercises);

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
