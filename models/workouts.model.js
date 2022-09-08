const client = require("../db/connection");

async function selectWorkoutsByUsername(userName) {
  await client.connect();

  const db = client.db("restless_test_db");
  const coll = db.collection("workouts");

  const cursor = coll.find({
    user_name: userName,
  });
  const output = [];

  await cursor.forEach((elem) => output.push(elem));
  return output;
}

module.exports = {
  selectWorkoutsByUsername,
};
