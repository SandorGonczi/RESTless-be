const { app, server } = require("../App");
const seedUsers = require("../db/seed/seed-users.js");
const seedWorkouts = require("../db/seed/seed-workouts.js");
const client = require("../db/connection");
const request = require("supertest");
const seedWorkoutPlans = require("../db/seed/seed-workoutplans");
const { ObjectId } = require("mongodb");
require("jest-sorted");

// beforeAll(() => {
//   seedUsers();
//   seedWorkouts();
//   seedWorkoutPlans();
// });

afterAll(() => {
  return server.close();
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

describe("POST /api/users", () => {
  test("status:201 inserts a new user to the db and sends the user back to the client", () => {
    return request(app)
      .post("/api/users")
      .send({
        user_name: "Joey",
        user_password: "password4",
      })
      .expect(201)
      .then(({ body }) => {
        const { _id } = body;

        expect(_id).toEqual(expect.any(String));
      });
  });

  test("POST:400 responds with an error message when provided wrong body", () => {
    return request(app)
      .post("/api/users")
      .send({
        wrong_key: "Joey",
        user_password: "password4",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });

  test("POST:400 responds with an error message when provided wrong body", () => {
    return request(app)
      .post("/api/users")
      .send({
        user_name: "Joey",
        wrongkey: "password4",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
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

describe("GET /api/workouts/:username", () => {
  test("status:200, responds with array of workout objects", () => {
    return request(app)
      .get("/api/workouts/Justin")
      .expect(200)
      .then(({ body }) => {
        const { workouts } = body;

        expect(workouts).toBeInstanceOf(Array);
        expect(workouts.length).toBeGreaterThan(0);
        workouts.forEach((workout) => {
          expect(workout).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              workout_name: expect.any(String),
              user_name: expect.any(String),
              rest_timer: expect.any(String),
              exercises: expect.any(Object),
            })
          );
        });
      });
  });
});

describe("POST /api/workouts/:username", () => {
  test("status:201, responds with a newly added workout object", () => {
    const newWorkout = {
      workout_name: "newly added test",
      user_name: "Justin",
      rest_timer: "150",
      exercises: {
        1: {
          exercise_id: "0007",
          feedback: "",
          sets: {
            1: {
              weight: 10,
              reps: 10,
              time: "null",
            },
            2: {
              weight: 10,
              reps: 10,
              time: "null",
            },
            3: {
              weight: 10,
              reps: 10,
              time: "null",
            },
          },
        },
        2: {
          exercise_id: "0110",
          feedback: "",
          sets: {
            1: {
              weight: 10,
              reps: 10,
              time: "null",
            },
            2: {
              weight: 10,
              reps: 10,
              time: "null",
            },
            3: {
              weight: 10,
              reps: 10,
              time: "null",
            },
          },
        },
      },
    };
    return request(app)
      .post("/api/workouts/Justin")
      .send(newWorkout)
      .expect(201)
      .then(({ body }) => {
        const { workout } = body;
        expect(workout).toBeInstanceOf(Array);
        expect(workout.length).toBeGreaterThan(0);
        workout.forEach((workout) => {
          expect(workout).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              workout_name: expect.any(String),
              user_name: expect.any(String),
              rest_timer: expect.any(String),
              exercises: expect.any(Object),
            })
          );
        });
      });
  });
});

describe("PATCH /api/workouts/:username", () => {
  test("status:200, responds with a newly updated workout object", () => {
    const updatedWorkout = {
      _id: "6319f39ce5a631eccdfb815a",
      workout_name: "NEW updated test workout",
      user_name: "Justin",
      rest_timer: "300",
      exercises: {
        1: {
          exercise_id: "0007",
          feedback: "",
          sets: {
            1: {
              weight: 50,
              reps: 50,
              time: "null",
            },
            2: {
              weight: 50,
              reps: 50,
              time: "null",
            },
            3: {
              weight: 50,
              reps: 50,
              time: "null",
            },
          },
        },
        2: {
          exercise_id: "0110",
          feedback: "",
          sets: {
            1: {
              weight: 45,
              reps: 45,
              time: "null",
            },
            2: {
              weight: 45,
              reps: 45,
              time: "null",
            },
            3: {
              weight: 45,
              reps: 45,
              time: "null",
            },
          },
        },
      },
    };
    return request(app)
      .patch("/api/workouts/Justin")
      .send(updatedWorkout)
      .expect(200)
      .then(({ body }) => {
        const { workout } = body;
        expect(workout).toBeInstanceOf(Array);
        expect(workout.length).toBeGreaterThan(0);
        workout.forEach((workout) => {
          expect(workout).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              workout_name: expect.any(String),
              user_name: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/workoutplans", () => {
  test("status:200, responds with array of workout objects", () => {
    return request(app)
      .get("/api/workoutplans")
      .expect(200)
      .then(({ body }) => {
        const { workoutPlans } = body;
        expect(workoutPlans).toBeInstanceOf(Array);
        expect(workoutPlans.length).toBeGreaterThan(0);
        workoutPlans.forEach((workoutPlan) => {
          expect(workoutPlan).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              workout_name: expect.any(String),

              rest_timer: expect.any(String),
              exercises: expect.any(Object),
            })
          );
        });
      });
  });
});
