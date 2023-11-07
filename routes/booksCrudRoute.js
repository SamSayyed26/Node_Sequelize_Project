const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../src/passport-config")(passport);

const { addBook } = require("../controllers/booksCrudController");
const { isAdmin } = require("../middlewares/routesAccess");

router.post(
  `/admin/addBook`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addBook
);

module.exports = router;
