const client = require("../db/connection");

async function selectUser(user_name, user_password) {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("users");

    const cursor = coll.find({
      user_name: user_name,
      user_password: user_password,
    });
    const output = [];

    await cursor.forEach((elem) => output.push(elem));
    return output[0];
  } finally {
    await client.close();
  }
}

module.exports = selectUser;
