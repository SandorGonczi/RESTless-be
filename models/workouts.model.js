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

async function insertWorkoutByUsername(
  userName,
  workoutName,
  restTimer,
  exercises
) {
  await client.connect();
  const db = client.db("restless_test_db");
  const coll = db.collection("workouts");

  const insertion = await coll.insertOne({
    workout_name: workoutName,
    user_name: userName,
    rest_timer: restTimer,
    exercises: exercises,
  });

  const workout = [];

  const cursor = coll.find({ _id: insertion.insertedId });
  await cursor.forEach((elem) => workout.push(elem));

  return workout;
}

module.exports = {
  selectWorkoutsByUsername,
  insertWorkoutByUsername,
};
