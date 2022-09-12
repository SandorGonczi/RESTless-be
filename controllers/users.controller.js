const {
  selectUserByUsernamePassword,
  insertNewUser,
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

exports.postNewUser = (req, res, next) => {
  const { user_name, user_password } = req.body;
  if (!user_name || !user_password) {
    res.status(400).send({ msg: "Bad Request" });
  }

  insertNewUser(user_name, user_password)
    .then((user) => {
      res.status(201).send({ _id: user._id });
    })
    .catch(next);
};
