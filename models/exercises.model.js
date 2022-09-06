const client = require("../db/connection");

async function selectExercises() {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("exercises");

    // find code goes here
    const cursor = coll.find();
    const output = [];
    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//selectExercises().catch(console.dir);

module.exports = selectExercises;
