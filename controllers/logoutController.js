const jwt = require("jsonwebtoken");
const { Token } = require("../models");

const logoutUser = async (req, res) => {
  await req.logout(async (err) => {
    if (err) {
      return next(err);
    }
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        const authToken = parts[1];

        const findUserToken = await Token.findOne({
          where: { token: authToken },
        });

        if (findUserToken) {
          await findUserToken.destroy();
          res.send({ message: "Logout Successful" });
        } else {
          res.send({ message: "Logged In user not found" });
        }
      }
    }
  });
};

module.exports = {
  logoutUser,
};
