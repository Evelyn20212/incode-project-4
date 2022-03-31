const protectedRoute = (req, res, next) => {
  // user logs in, then res.session.userId called
  if (!req.session.userID) {
    res.clearCookie("mrcoffee_sid"); // from the front end
    res.status(401).redirect("/login");
  } else {
    next();
  }
};

const successRoute = (req, res, next) => {
  if (req.session.userID) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { protectedRoute, successRoute };
