const { User, Token } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUserLogic(userData, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const hash = await bcrypt.hash(userData.password, 10);
      userData.password = hash;
      await User.create(userData);
      return res.json({ message: "Registered" });
    } else {
      return res.json({ error: "User already exists" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Error: ${err.message}` });
  }
}

const createJWT = async (checkUser) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log("CHECK USER NAME: ", checkUser.firstName);
    const userToken = jwt.sign(
      { userEmail: checkUser.email, role: checkUser.role },
      secretKey,
      {
        expiresIn: "5h",
      }
    );
    let tokenData = {
      id: Token.id,
      userId: checkUser.id,
      token: userToken,
    };

    await Token.create(tokenData, { returning: [] });
    return userToken;
  } catch (err) {
    console.log(err);
  }
};

async function loginUserLogic(userEmail, userPassword, res) {
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

async function logoutUserLogic(authToken, res) {
  try {
    const findUserToken = await Token.findOne({
      where: { token: authToken },
    });

    if (findUserToken) {
      await findUserToken.destroy();
      res.send({ message: "Logout Successful" });
    } else {
      res.send({ message: "Logged In user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createUserLogic,
  createJWT,
  loginUserLogic,
  logoutUserLogic,
};
