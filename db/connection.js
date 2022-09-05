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

    const db = client.db("sample_guides");
    const coll = db.collection("planets");

    // find code goes here
    const cursor = coll.find({ hasRings: true });
    const planets = [];
    // iterate code goes here
    await cursor.forEach((elem) => planets.push(elem));
    console.log(planets);
    return planets;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);

module.exports = run;