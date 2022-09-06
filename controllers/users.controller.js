const selectUser = require("../models/users.model");

exports.getUser = (req, res, next) => {
  const validQueryKeys = ["user_name", "user_password"];
  for (let key in req.query) {
    if (!validQueryKeys.includes(key)) {
      res.status(400).send({ msg: "Invalid Request!" });
    }
  }

  const { user_name, user_password } = req.query;
  selectUser(user_name, user_password)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
