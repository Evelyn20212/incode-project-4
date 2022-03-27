const express = require("express");
const db = require("../Project_04_Chad_Slater_Evelyn_Li/database");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", (req, res) => {
  //remove the entire session
  //clear the cookie
  req.session.destroy((err) => {
    if (err) {
      res.render("pages/error", {
        error: error.message,
        title: "Cannot logout",
      });
    } else {
      console.log("logged out");
      res.clearCookie("req.session.name");
      res.redirect("/login");
    }
  });
});
module.exports = router;
