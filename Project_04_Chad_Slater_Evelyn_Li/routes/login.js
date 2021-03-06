const express = require("express");
const router = express.Router();

const db = require("../database");
const bcrypt = require("bcryptjs");
const { successRoute } = require("../middleware/protectedRoute");

// Get login page
// Post login attempt
router
  .route("/")
  .get(successRoute, (req, res) => {
    res.render("login", {
      title: "Log in",
    });
  })
  .post((req, res) => {
    const { email, password } = req.body;
    const cleanedEmail = email.toLowerCase().trim();

    db.oneOrNone("SELECT * FROM USERS WHERE email = $1", [cleanedEmail])
      .then((user) => {
        checkPassword = bcrypt.compareSync(password, user.password);

        if (!checkPassword) {
          res.render("error", {
            title: "Error",
            errorCode: 401,
            errorMessage: "Invalid login attempt",
          });
        }

        req.session.userID = user.id;
        req.session.loggedIn = true;
        return res.redirect("/");
      })
      .catch((error) => {
        res.render("error", {
          title: "Error",
          errorCode: 500,
          errorMessage: error.message,
        });
      });
  });

module.exports = router;
