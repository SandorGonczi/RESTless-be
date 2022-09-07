const selectUser = require("../models/users.model");

exports.getUser = (req, res, next) => {
  const validQueryKeys = ["user_name", "user_password"];
  for (let key in req.query) {
    if (!validQueryKeys.includes(key)) {
      res.status(400).send({ msg: "Bad Request" });
    }
  }

  const { user_name, user_password } = req.query;
  selectUser(user_name, user_password)
    .then((user) => {
      if (user) res.status(200).send({ user: user });
      else res.status(400).send({ msg: "Wrong UserName / Password!" });
    })
    .catch(next);
};
