const { MongoClient } = require("mongodb");


// Replace the uri string with your MongoDB deployment's connection string.

require('dotenv').config({
  path: `${__dirname}/../.env.test`,
});

const uri = process.env.TEST_DATABASE
const client = new MongoClient(uri);


module.exports = client;