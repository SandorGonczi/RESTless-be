const request = require("supertest");
const app = require("../App");
const db = require("../db/connection");

describe("GET /exercises", () => {
  test("status:200, responds with an array of exercise objects", () => {
    return request(app)
      .get("/exercises")
      .expect(200)
      .then(({ body }) => {
        const exercises = body;
        console.log(exercises);
        expect(exercises).toBeInstanceOf(Array);
        expect(exercises.length).toBeGreaterThan(0);
        exercises.forEach((exercise) => {
          expect(exercise).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              bodyPart: expect.any(String),
              equipment: expect.any(String),
              gifUrl: expect.any(String),
              id: expect.any(String),
              name: expect.any(String),
              target: expect.any(String),
            })
          );
        });
      });
  });
});
