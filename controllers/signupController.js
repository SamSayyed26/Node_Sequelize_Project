const { User } = require("../models");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const userData = {
    id: User.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password ||
    !userData.role
  ) {
    res.send({ message: "FIELDS cannot be empty" });
  } else {
    User.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (!user) {
          bcrypt.hash(userData.password, 10, (err, hash) => {
            userData.password = hash;
            User.create(userData)
              .then(() => res.json({ message: "Registerd" }))
              .catch((err) => res.send(err));
          });
        } else {
          res.json({ error: " User already exists" });
        }
      })
      .catch((err) => {
        res.send({ error: `ERR Reading the Model ${err}` });
      });
  }
};

module.exports = {
  createUser,
};
