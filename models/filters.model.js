const client = require("../db/connection");

async function selectBodyParts() {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("bodyparts");

    // find code goes here

    const cursor = coll.find();

    const output = [];

    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function selectEquipments() {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("equipment");

    // find code goes here

    const cursor = coll.find();

    const output = [];

    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function selectTargets() {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("target");

    // find code goes here

    const cursor = coll.find();

    const output = [];

    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { selectBodyParts, selectEquipments, selectTargets };
