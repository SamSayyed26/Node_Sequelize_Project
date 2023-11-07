const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../src/passport-config")(passport);

const {
  protected,
  protectedBooks,
} = require("../controllers/protectedController");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  protected
);

router.get(
  `/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  protectedBooks
);

module.exports = router;
