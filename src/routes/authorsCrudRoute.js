const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  readAuthors,
  addAuthor,
  editAuthor,
  deleteAuthor,
} = require("../controllers/Authors");
const { isAdmin, authorize } = require("../middlewares/routesAccess");

router.get(
  `/authors/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  readAuthors
);

router.post(
  `/admin/addAuthor`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addAuthor
);

router.post(
  `/admin/editAuthor`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editAuthor
);

router.delete(
  `/admin/deleteAuthor`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteAuthor
);

module.exports = router;
