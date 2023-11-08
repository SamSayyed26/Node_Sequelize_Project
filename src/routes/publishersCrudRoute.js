const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-config")(passport);

const {
  readPublisher,
  addPublisher,
  editPublisher,
  deletePublisher,
} = require("../controllers/Publishers");
const { isAdmin, authorize } = require("../middlewares/routesAccess");

router.get(
  `/publishers/:page`,
  passport.authenticate("jwt", { session: false }),
  authorize(["user", "admin"]),
  readPublisher
);

router.post(
  `/admin/addPublisher`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  addPublisher
);

router.post(
  `/admin/editPublisher`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editPublisher
);

router.delete(
  `/admin/deletePublisher`,
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deletePublisher
);

module.exports = router;
