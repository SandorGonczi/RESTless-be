const { app, server } = require("../App");
const seedUsers = require("../db/seed/seed-users.js");
const seedWorkouts = require("../db/seed/seed-workouts.js");

const client = require("../db/connection");
const request = require("supertest");
require("jest-sorted");

beforeAll(() => {
  seedUsers();
  seedWorkouts();
});

afterAll(() => {
  return client.close();
});

// beforeEach(() => {
//   return seed();
// });

describe("GET api/exercises", () => {
  test("status:200, responds with an array of exercise objects", () => {
    return request(app)
      .get("/api/exercises")
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

describe("/api/nothinghere", () => {
  describe("GET", () => {
    test("Status 404 - Not found", () => {
      return request(app)
        .get("/api/nothinghere")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("bad path!");
        });
    });
  });
});

describe("GET /api/exercises (queries)", () => {
  test("status:200, responds with an array of exercise objects with correct properties", () => {
    return request(app)
      .get("/api/exercises?sort_by=name")
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
      .get("/api/exercises?sort_by=_id")
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
      .get("/api/exercises")
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
      .get("/api/exercises?order=DESC")
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
      .get("/api/exercises?equipment=body%20weight")
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
      .get("/api/exercises?equipment=body%20weight&body_part=chest")
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
        "/api/exercises?sort_by=target&order=DESC&equipment=body%20weight&body_part=chest"
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
      .get("/api/exercises?id=1306")
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
      .get("/api/exercises?sort_by=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when query is invalid order", () => {
    return request(app)
      .get("/api/exercises?order=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when query is invalid filter", () => {
    return request(app)
      .get("/api/exercises?fish=fish")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when sort query is mis-spelled", () => {
    return request(app)
      .get("/api/exercises?sortby=_id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when order query is mis-spelled", () => {
    return request(app)
      .get("/api/exercises?orde=ASC")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("status:400, gives correct error when filter query is mis-spelled", () => {
    return request(app)
      .get("/api/exercises?trget=chest")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /users - username + password ", () => {
  test("status:200, responds with a user object", () => {
    return request(app)
      .get("/api/users?user_name=Justin&user_password=password1")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toBeInstanceOf(Object);
        expect(user.user_name).toEqual("Justin");
        expect(user.user_password).toEqual("password1");
      });
  });

  test("status:400, gives correct error when incorrect query is in the request", () => {
    return request(app)
      .get("/api/users?user_nam=Justin&user_password=password1")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });

  test("status:400, gives correct error when incorrect query is in the request", () => {
    return request(app)
      .get("/api/users?user_name=Justina&user_password=password1")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Wrong UserName / Password!");
      });
  });
});

describe("GET api/bodyparts", () => {
  test("status:200, responds with an array of bodyparts", () => {
    return request(app)
      .get("/api/bodyparts")
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
            })
          );
        });
      });
  });
});

describe("GET api/equipment", () => {
  test("status:200, responds with an array of equipment", () => {
    return request(app)
      .get("/api/equipment")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        exercises.forEach((exercise) => {
          expect(exercise).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              equipment: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET api/target", () => {
  test("status:200, responds with an array of bodyparts", () => {
    return request(app)
      .get("/api/target")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        exercises.forEach((exercise) => {
          expect(exercise).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              target: expect.any(String),
            })
          );
        });
      });
  });
});

// describe("GET /api/workouts/:username", () => {
//   test("status:200, responds with array of workout objects", () => {
//     return request(app)
//       .get("/api/workouts/Justin")
//       .expect(200)
//       .then(({ body }) => {
//         const { workouts } = body;
//         // expect(user).toBeInstanceOf(Object);
//         // expect(user.user_name).toEqual("Lance");
//         // expect(user.user_password).toEqual("password2");
//       });
//   });
// });
