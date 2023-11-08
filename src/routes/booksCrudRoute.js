const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  readBooks,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/Books");
const { isAdmin, authorize } = require("../middlewares/routesAccess");

router.get(
  `/books/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  readBooks
);

router.post(
  `/admin/addBook`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addBook
);

router.post(
  `/admin/editBook`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editBook
);

router.delete(
  `/admin/deleteBook`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteBook
);

module.exports = router;
