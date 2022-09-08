const client = require("../db/connection");

async function selectBodyParts() {
  await client.connect();

  const db = client.db("restless_test_db");
  const coll = db.collection("bodyparts");

  // find code goes here

  const cursor = coll.find();

  const output = [];

  // iterate code goes here
  await cursor.forEach((elem) => output.push(elem));
  return output;
}

async function selectEquipments() {
  await client.connect();

  const db = client.db("restless_test_db");
  const coll = db.collection("equipment");

  // find code goes here

  const cursor = coll.find();

  const output = [];

  // iterate code goes here
  await cursor.forEach((elem) => output.push(elem));
  return output;
}

async function selectTargets() {
  await client.connect();

  const db = client.db("restless_test_db");
  const coll = db.collection("target");

  // find code goes here

  const cursor = coll.find();

  const output = [];

  // iterate code goes here
  await cursor.forEach((elem) => output.push(elem));
  return output;
}

module.exports = { selectBodyParts, selectEquipments, selectTargets };
