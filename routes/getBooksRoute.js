const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../src/passport-config")(passport);

const {
  booksOfAuthor,
  BooksOfPublisher,
  booksOfGenre,
} = require("../controllers/getBooksController");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/booksOfAuthor`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  booksOfAuthor
);
router.get(
  `/BooksOfPublisher`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  BooksOfPublisher
);
router.get(
  `/booksOfGenre`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  booksOfGenre
);

module.exports = router;
