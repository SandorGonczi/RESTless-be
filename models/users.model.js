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

<<<<<<< HEAD
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
=======
// async function updateUserById(userId, newWorkout) {
//   try {
//     await client.connect();

//     const db = client.db("restless_test_db");
//     const coll = db.collection("users");

//     const filter = { user_id: userId };
//     const updateDoc = { $set: { workouts: newWorkout } };
//     const result = await coll.updateOne(filter, updateDoc);
//     return result;
//   } finally {
//     await client.close();
//   }
// }
>>>>>>> 275e994aaa7812df103480e93c5dd611db24651b

module.exports = {
  selectUserByUsernamePassword,
  selectUserById,
<<<<<<< HEAD
  insertNewUser,
=======
  // updateUserById,
>>>>>>> 275e994aaa7812df103480e93c5dd611db24651b
};
