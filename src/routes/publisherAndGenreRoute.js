const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const { publisherAndGenre } = require("../controllers/Books");
const { authorize } = require("../middlewares/routesAccess");

router.post(
  "/publisherAndGenre",
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  publisherAndGenre
);

module.exports = router;
