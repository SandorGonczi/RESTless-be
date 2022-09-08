const client = require("../connection");
const users = require("../data/test/users");

async function seedUsers() {
  await client.connect();

  const db = client.db("restless_test_db");

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((elem) => elem.name);

  if (collectionNames.includes("users")) await db.collection("users").drop();

  await db.createCollection("users");
  await db.collection("users").insertMany(users);
}

// seedUsers();

module.exports = seedUsers;
