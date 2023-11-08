const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  readGenre,
  addGenre,
  editGenre,
  deleteGenre,
} = require("../controllers/Genre");

const { isAdmin, authorize } = require("../middlewares/routesAccess");

router.get(
  `/genres/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  readGenre
);

router.post(
  `/admin/addGenre`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addGenre
);

router.post(
  `/admin/editGenre`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editGenre
);

router.delete(
  `/admin/deleteGenre`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteGenre
);

module.exports = router;
