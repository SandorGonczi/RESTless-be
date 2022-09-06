const client = require("../db/connection");

async function selectExercises(
  sortBy = "name",
  order = "ASC",
  bodyPart,
  equipment,
  target,
  id
) {
  let sortOrder;
  if (order === "ASC") {
    sortOrder = 1;
  } else if (order === "DESC") {
    sortOrder = -1;
  }

  const validSortBys = [
    "bodyPart",
    "equipment",
    "gifUrl",
    "_id",
    "name",
    "target",
  ];
  const validOrders = ["ASC", "DESC"];

  if (!validSortBys.includes(sortBy) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  try {
    await client.connect();

    const db = client.db("restless_test_db");
    const coll = db.collection("exercises");
    let cursor;

    // find code goes here

    let query = { $and: [] };

    if (id) {
      query.$and.push({ _id: id });
    }
    if (bodyPart) {
      query.$and.push({ bodyPart: bodyPart });
    }
    if (equipment) {
      query.$and.push({ equipment: equipment });
    }
    if (target) {
      query.$and.push({ target: target });
    }

    if (bodyPart || equipment || target || id) {
      cursor = coll.find(query).sort({ [sortBy]: [sortOrder] });
    } else {
      cursor = coll.find().sort({ [sortBy]: [sortOrder] });
    }

    const output = [];

    // iterate code goes here
    await cursor.forEach((elem) => output.push(elem));
    return output;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//selectExercises().catch(console.dir);

module.exports = selectExercises;
