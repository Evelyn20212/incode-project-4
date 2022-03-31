const protectedRoute = (req, res, next) => {
  // user loggs in, then res.session.userId called
  if (!req.session.userID) {
    res.clearCookie("mrcoffee_sid"); // from the front end
    res.status(401).redirect("/login");
  } else {
    console.log(req.session);
    next();
  }
};

const successRoute = (req, res, next) => {
  if (req.session.userID) {
    console.log("You are logged in, redirecting to home");
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { protectedRoute, successRoute };
