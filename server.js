const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const run = require("./crud-read");

app.get(["/"], (req, res) => {
  run().then((planets) => res.send({ planets }));
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
