const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const { protected } = require("../controllers/Books");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  protected
);

module.exports = router;
