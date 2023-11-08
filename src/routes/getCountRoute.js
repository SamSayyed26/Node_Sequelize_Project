const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  publisherCount,
  authorCount,
  genreCount,
} = require("../controllers/Books");
const { authorize } = require("../middlewares/routesAccess");

router.post(
  `/publisher`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  publisherCount
);

router.post(
  `/author`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  authorCount
);
router.post(
  `/genre`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  genreCount
);

module.exports = router;
