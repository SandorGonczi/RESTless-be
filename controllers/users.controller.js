const {
  selectUserByUsernamePassword,
  selectUserById,
<<<<<<< HEAD
  insertNewUser,
=======
  // updateUserById,
>>>>>>> 275e994aaa7812df103480e93c5dd611db24651b
} = require("../models/users.model");

exports.getUserByUsernamePassword = (req, res, next) => {
  const validQueryKeys = ["user_name", "user_password"];
  if (Object.keys(req.query).length != 0) {
    for (let key in req.query) {
      if (!validQueryKeys.includes(key)) {
        res.status(400).send({ msg: "Bad Request" });
      }
    }
  }
  const userName = req.query.user_name;
  const userPassword = req.query.user_password;
  selectUserByUsernamePassword(userName, userPassword)
    .then((user) => {
      if (user) res.status(200).send({ user: user });
      else res.status(400).send({ msg: "Wrong UserName / Password!" });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.userid;
  selectUserById(userId)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};

<<<<<<< HEAD
exports.postNewUser = (req, res, next) => {
  const { user_name, user_password } = req.body;

  insertNewUser(user_name, user_password)
    .then((user) => {
      console.log(user);
      res.status(201).send({ _id: user._id });
=======
exports.patchUserById = (req, res, next) => {
  const userId = req.params.userid;
  const newWorkout = req.body.new_workout;
  updateUserById(userId, newWorkout)
    .then((user) => {
      res.status(200).send({ user: user });
>>>>>>> 275e994aaa7812df103480e93c5dd611db24651b
    })
    .catch(next);
};
