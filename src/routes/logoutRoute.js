const express = require("express");
const router = express.Router();
const passport = require("passport");

const { logoutUser } = require("../controllers/Auth");
const { authorize } = require("../middlewares/routesAccess");

router.delete(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  logoutUser
);

module.exports = router;
