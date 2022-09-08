const client = require("../connection");
const workouts = require("../data/test/workouts");

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

// seedWorkouts();

module.exports = seedWorkouts;
