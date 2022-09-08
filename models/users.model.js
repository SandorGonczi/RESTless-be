const client = require("../db/connection");

async function selectUserByUsernamePassword(userName, userPassword) {
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
}

async function insertNewUser(userName, userPassword) {
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
}

module.exports = {
  selectUserByUsernamePassword,
  insertNewUser,
};
