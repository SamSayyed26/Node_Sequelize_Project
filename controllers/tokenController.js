const { checkUser } = require("./loginController");
const { User, Token } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

async function createJWT(checkUser) {
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
}

// async function createJWTForAdmin(checkUser) {
//   console.log("CHECK ADMIN NAME: ", checkUser.firstName);
//   const adminToken = jwt.sign(
//     { userEmail: checkUser.email, role: "admin" },
//     adminSecretKey,
//     {
//       expiresIn: "5h",
//     }
//   );
//   let tokenData = {
//     id: Token.id,
//     userId: checkUser.id,
//     token: adminToken,
//   };

//   await Token.create(tokenData, { returning: [] });

//   return adminToken;
// }

module.exports = {
  createJWT,
  // createJWTForAdmin,
};
