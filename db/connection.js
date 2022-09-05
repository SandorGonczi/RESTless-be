const { MongoClient } = require("mongodb");


// Replace the uri string with your MongoDB deployment's connection string.

require('dotenv').config({
  path: `${__dirname}/../.env.test`,
});

const uri = process.env.TEST_DATABASE
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("exercises");

    // find code goes here
    const cursor = coll.find({bodyPart:"chest"});
    const output = [];
    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    console.log(output);
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);

module.exports = run;