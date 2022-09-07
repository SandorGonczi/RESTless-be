const client = require("../db/connection");

async function selectUserByUsernamePassword(userName, userPassword) {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("users");

    const cursor = coll.find({
      user_name: userName,
      user_password: userPassword,
    });
    const output = [];

    await cursor.forEach((elem) => output.push(elem));
    return output[0];
  } finally {
    await client.close();
  }
}

async function selectUserById(userId) {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("users");

    const cursor = coll.find({
      user_id: userId,
    });
    const output = [];

    await cursor.forEach((elem) => output.push(elem));
    return output[0];
  } finally {
    await client.close();
  }
}

async function insertNewUser(userName, userPassword) {
  try {
    await client.connect();
    const db = client.db("restless_test_db");
    const coll = db.collection("users");

    const insertion = await coll.insertOne({
      user_name: userName,
      user_password: userPassword,
      workouts: {},
    });
    const user = [];
    const cursor = coll.find({ _id: insertion.insertedId });
    await cursor.forEach((elem) => user.push(elem));

    return user[0];
  } finally {
    await client.close();
  }
}

module.exports = {
  selectUserByUsernamePassword,
  selectUserById,
  insertNewUser,
};
