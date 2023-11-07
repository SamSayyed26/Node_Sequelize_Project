const express = require("express");
const router = express.Router();
const passport = require("passport");

const { logoutUser } = require("../controllers/logoutController");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  logoutUser
);

module.exports = router;