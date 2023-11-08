const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  getBooksAfterYear,
  getBooksBeforeYear,
} = require("../controllers/Books");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/after/:year/:pageNo`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  getBooksAfterYear
);
router.get(
  `/before/:year/:pageNo`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  getBooksBeforeYear
);

module.exports = router;
