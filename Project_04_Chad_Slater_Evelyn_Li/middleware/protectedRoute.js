const protectedRoute = (req, res, next) => {
  // user loggs in, then res.session.userId called
  if (req.session.userId) {
    console.log("No login, redirecting to the login page please");
    res.clearCookie("name"); // from the front end
    res.status(401).redirect("login");
  } else {
    console.log(req.session);
    next();
  }
};

const successRoute = (req, res, next) => {
  if (req.session.userId) {
    console.log("You are logged in, redirecting to home");
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { protectedRoute };
