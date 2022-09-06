const request = require("supertest");
const app = require("../App");
const db = require("../db/connection");
require("jest-sorted");

///////////////////////////////////////////

//EXERCISES tests

///////////////////////////////////////////

describe("GET /exercises", () => {
  test("status:200, responds with an array of exercise objects with correct properties", () => {
    return request(app)
      .get("/exercises")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        exercises.forEach((exercise) => {
          expect(exercise).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              bodyPart: expect.any(String),
              equipment: expect.any(String),
              gifUrl: expect.any(String),
              name: expect.any(String),
              target: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /exercises (queries)", () => {
  test("status:200, responds with an array of exercise objects with correct properties", () => {
    return request(app)
      .get("/exercises?sort_by=name")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        exercises.forEach((exercise) => {
          expect(exercise).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              bodyPart: expect.any(String),
              equipment: expect.any(String),
              gifUrl: expect.any(String),
              name: expect.any(String),
              target: expect.any(String),
            })
          );
        });
      });
  });

  test("status:200, responds with array of exercise objects, sorted by specified column", () => {
    return request(app)
      .get("/exercises?sort_by=_id")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        expect(exercises).toBeSortedBy("_id", {
          descending: false,
          coerce: true,
        });
        expect(exercises[0]).toEqual({
          _id: "0007",
          bodyPart: "back",
          equipment: "cable",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
          name: "alternate lateral pulldown",
          target: "lats",
        });
      });
  });

  test("status:200, responds with array of exercise objects, sorted by name as default and in ascending order as default", () => {
    return request(app)
      .get("/exercises")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        expect(exercises).toBeSortedBy("name", {
          descending: false,
          coerce: true,
        });
        expect(exercises[0]).toEqual({
          _id: "0007",
          bodyPart: "back",
          equipment: "cable",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
          name: "alternate lateral pulldown",
          target: "lats",
        });
      });
  });

  test("status:200, responds with array of exercise objects, with specified order", () => {
    return request(app)
      .get("/exercises?order=DESC")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        expect(exercises).toBeSortedBy("name", {
          descending: true,
          coerce: true,
        });
        expect(exercises[0]).toEqual({
          _id: "1604",
          bodyPart: "upper legs",
          equipment: "body weight",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/1604.gif",
          name: "world greatest stretch",
          target: "hamstrings",
        });
      });
  });

  test("status:200, responds with array of exercise objects, filtered by one specified value", () => {
    return request(app)
      .get("/exercises?equipment=body%20weight")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toEqual(9);
        expect(exercises[0]).toEqual({
          _id: "2312",
          bodyPart: "waist",
          equipment: "body weight",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/2312.gif",
          name: "lying elbow to knee",
          target: "abs",
        });
      });
  });

  test("status:200, responds with array of exercise objects, filtered by multiple specified values", () => {
    return request(app)
      .get("/exercises?equipment=body%20weight&body_part=chest")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toEqual(2);
        expect(exercises[0]).toEqual({
          _id: "1306",
          bodyPart: "chest",
          equipment: "body weight",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/1306.gif",
          name: "plyo push up",
          target: "pectorals",
        });
      });
  });

  test("status:200, responds with array of exercise objects, filtered by multiple specified values, and ordered by specified property", () => {
    return request(app)
      .get(
        "/exercises?sort_by=target&order=DESC&equipment=body%20weight&body_part=chest"
      )
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toEqual(2);
        expect(exercises[0]).toEqual({
          _id: "3021",
          bodyPart: "chest",
          equipment: "body weight",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3021.gif",
          name: "scapula push-up",
          target: "serratus anterior",
        });
      });
  });

  test("status:200, responds with single exercise object when passed id query", () => {
    return request(app)
      .get("/exercises?id=1306")
      .expect(200)
      .then(({ body }) => {
        const exercise = body;
        expect(typeof exercise[0]).toBe("object");
        expect(exercise[0]).toEqual({
          _id: "1306",
          bodyPart: "chest",
          equipment: "body weight",
          gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/1306.gif",
          name: "plyo push up",
          target: "pectorals",
        });
      });
  });

  test("status:400, gives correct error when query is invalid sort_by", () => {
    return request(app)
      .get("/exercises?sort_by=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when query is invalid order", () => {
    return request(app)
      .get("/exercises?order=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when query is invalid filter", () => {
    return request(app)
      .get("/exercises?fish=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when sort query is mis-spelled", () => {
    return request(app)
      .get("/exercises?sortby=_id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when order query is mis-spelled", () => {
    return request(app)
      .get("/exercises?orde=ASC")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when filter query is mis-spelled", () => {
    return request(app)
      .get("/exercises?trget=chest")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});
