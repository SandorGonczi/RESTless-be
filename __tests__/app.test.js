const request = require("supertest");
const app = require("../App");
const db = require("../db/connection");
const seed = require("../db/seed/seed.js");

// afterAll(() => {
//   return db.close();
// });

beforeEach(() => {
  return seed();
});

describe("GET /exercises", () => {
  test("status:200, responds with an array of exercise objects", () => {
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

describe("/api/errorhandling", () => {
  describe("GET", () => {
    test("Status 404 - Not found", () => {
      return request(app)
        .get("/api/errorhandling")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found!");
        });
    });
  });
});

describe.only("GET /users", () => {
  test("status:200, responds with a user object", () => {
    return request(app)
      .get("/api/users?user_name=Justin&user_password=password1")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toBeInstanceOf(Object);
        expect(user.user_name).toEqual("Justin");
        expect(user.user_password).toEqual("password1");
        expect(user.workouts).toBeInstanceOf(Object);
      });
  });
});
