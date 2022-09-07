const client = require("../db/connection");

async function selectUserByUsernamePassword(userName, userPassword) {
  try {
    await client.connect();
    console.log(userName, userPassword);
    const db = client.db("restless_test_db");
    const coll = db.collection("users");

    const cursor = coll.find({
      user_name: [userName],
      user_password: [userPassword],
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

module.exports = { selectUserByUsernamePassword, selectUserById };
