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

async function insertWorkoutByUsername(userName) {
  await client.connect();
  const db = client.db("restless_test_db");
  const coll = db.collection("workouts");

  const insertion = await coll.insertOne({
    user_name: userName,
  });
  const workout = [];
  const cursor = coll.find({ _id: insertion.insertedId });
  await cursor.forEach((elem) => workout.push(elem));

  return user[0];
}

module.exports = {
  selectWorkoutsByUsername,
  insertWorkoutByUsername,
};
