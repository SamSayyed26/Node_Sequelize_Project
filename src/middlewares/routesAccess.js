function authorize(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.send({ message: "Forbidden Route" });
    }
  };
}

function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.send({ message: "Forbidden Route" });
  }
}

module.exports = {
  authorize,
  isAdmin,
};
