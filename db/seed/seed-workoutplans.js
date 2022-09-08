const client = require("../connection");
const workoutPlans = require("../data/test/workoutPlans");

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

module.exports = seedWorkoutPlans;
