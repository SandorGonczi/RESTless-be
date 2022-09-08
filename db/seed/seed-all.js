const client = require("../connection");
const users = require("../data/test/users");
const workouts = require("../data/test/workouts");
const workoutPlans = require("../data/test/workoutPlans");

async function seedUsers() {
  await client.connect();

  const db = client.db("restless_test_db");

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((elem) => elem.name);

  if (collectionNames.includes("users")) await db.collection("users").drop();

  await db.createCollection("users");
  await db.collection("users").insertMany(users);
}

async function seedWorkouts() {
  await client.connect();

  const db = client.db("restless_test_db");

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((elem) => elem.name);

  if (collectionNames.includes("workouts"))
    await db.collection("workouts").drop();

  await db.createCollection("workouts");
  await db.collection("workouts").insertMany(workouts);
}

async function seedWorkoutPlans() {
  await client.connect();

  const db = client.db("restless_test_db");

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((elem) => elem.name);

  if (collectionNames.includes("workoutPlans")) {
    await db.collection("workoutPlans").drop();
  }

  await db.createCollection("workoutPlans");

  await db.collection("workoutPlans").insertMany(workoutPlans);
}

seedUsers();
seedWorkouts();
seedWorkoutPlans();

module.exports = { seedWorkouts, seedUsers, seedWorkoutPlans };
