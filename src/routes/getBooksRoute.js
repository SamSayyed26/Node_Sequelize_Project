const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  booksOfAuthor,
  booksOfPublisher,
  booksOfGenre,
} = require("../controllers/Books");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/booksOfAuthor`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  booksOfAuthor
);
router.get(
  `/booksOfPublisher`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  booksOfPublisher
);
router.get(
  `/booksOfGenre`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  booksOfGenre
);

module.exports = router;
