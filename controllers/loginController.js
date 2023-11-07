const { User } = require("../models");
const { createJWT } = require("./tokenController");
const bcrypt = require("bcrypt");

async function checkUser(userEmail, userPassword, res) {
  let user;
  try {
    user = await User.findOne({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const matched = await bcrypt.compare(userPassword, user.password);

      if (matched) {
        let token = await createJWT(user);
      
        console.log("TOKEN VALUE ", token);
        res.send({
          message: `Welcome ${user.firstName} ${user.lastName}`,
          userToken: token,
        });
      } else {
        res.send({ message: "Incorrect Password" });
      }

      console.log("Matched Password: ", matched);
    } else {
      res.send({ message: "User not found" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
  return user;
}

const loginUser = (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  const userData = {
    email: userEmail,
    password: userPassword,
  };

  if (!userData.email || !userData.password) {
    res.send({ message: "FIELDS cannot be empty" });
  } else {
    checkUser(userEmail, userPassword, res);
  }
};

module.exports = {
  loginUser,
  checkUser,
};
