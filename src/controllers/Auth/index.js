const { User } = require("../../models");
const {
  createUserLogic,
  loginUserLogic,
  logoutUserLogic,
} = require("../../services/Auth");
const pattern = /^ *$/;
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const namePattern = /^[a-zA-Z ]+$/;

const createUser = async (req, res) => {
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
    return res.status(400).json({ message: "Values cannot be empty" });
  } else {
    if (
      pattern.test(userData.firstName) ||
      pattern.test(userData.lastName) ||
      pattern.test(userData.email) ||
      pattern.test(userData.password) ||
      pattern.test(userData.role)
    ) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    if (!emailPattern.test(userData.email)) {
      return res.status(400).json({ message: "Incorrect Email Format" });
    }
    if (
      !namePattern.test(userData.firstName) ||
      !namePattern.test(userData.lastName)
    ) {
      return res.status(400).json({
        message: "Name cannot contain numbers or special characters",
      });
    }
    await createUserLogic(userData, res);
  }
};

const loginUser = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  const userData = {
    email: userEmail,
    password: userPassword,
  };

  if (!userData.email || !userData.password) {
    res.send({ message: "FIELDS cannot be empty" });
  } else {
    if (pattern.test(userData.email) || pattern.test(userData.password)) {
      return res
        .status(400)
        .json({ message: "Values cannot contain only spaces" });
    }
    await loginUserLogic(userEmail, userPassword, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.logout(async (err) => {
      if (err) {
        return next(err);
      }
      const authHeader = req.headers["authorization"];

      if (authHeader) {
        const parts = authHeader.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
          const authToken = parts[1];
          logoutUserLogic(authToken, res);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
