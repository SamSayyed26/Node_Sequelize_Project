const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../src/passport-config")(passport);

const { searchBooks } = require("../controllers/textSearchInBooksController");
const {
  searchPublishers,
} = require("../controllers/textSearchInPublishersController");
const {
  searchAuthors,
} = require("../controllers/textSearchInAuthorsController");
const { authorize } = require("../middlewares/routesAccess");

router.get(
  `/books/:searchText/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  searchBooks
);

router.get(
  `/authors/:searchText/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  searchAuthors
);

router.get(
  `/publishers/:searchText/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  searchPublishers
);

module.exports = router;
