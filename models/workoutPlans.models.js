const client = require("../db/connection");

async function fetchWorkoutPlans() {
  await client.connect();

  const db = client.db("restless_test_db");
  const coll = db.collection("workoutPlans");

  const cursor = coll.find();
  const output = [];

  await cursor.forEach((elem) => output.push(elem));
  return output;
}

module.exports = {
  fetchWorkoutPlans,
};
