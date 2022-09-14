const { ObjectId } = require("mongodb");
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

async function updateWorkoutByUsername(
  id,
  userName,
  workoutName,
  restTimer,
  exercises
) {
  const formattedId = new ObjectId(id);
  await client.connect();
  const db = client.db("restless_test_db");
  const coll = db.collection("workouts");
  const filter = { _id: formattedId };
  const updateDoc = {
    $set: {
      workout_name: workoutName,
      user_name: userName,
      rest_timer: restTimer,
      exercises: exercises,
    },
  };
  await coll.updateOne(filter, updateDoc);
  const workout = [];

  const cursor = coll.find({ _id: formattedId });
  await cursor.forEach((elem) => workout.push(elem));
  return workout;
}

// async function removeWorkoutByUsername(userName, workoutName) {
//   await client.connect();
//   const db = client.db("restless_test_db");
//   const coll = db.collection("workouts");

//   const deletion = await coll
//     .deleteMany({
//       workout_name: workoutName,
//       user_name: userName,
//     })
//     .then((res) => {
//       if (res.deletedCount === 0) {
//         return Promise.reject({ status: 404, msg: "Workout does not exist!" });
//       }
//       return res;
//     });

//   return deletion;
// }

module.exports = {
  selectWorkoutsByUsername,
  insertWorkoutByUsername,
  updateWorkoutByUsername,
  removeWorkoutByUsername,
};
