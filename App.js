const express = require("express");
const { getExercises } = require("./controllers/exercises.controller");
const app = express();
const port = process.env.PORT || 3000;

app.get(["/exercises"], getExercises);

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

///////////////////////////////////

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

module.exports = app;
