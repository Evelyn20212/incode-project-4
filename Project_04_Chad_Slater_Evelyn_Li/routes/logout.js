const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  //remove the entire session
  //clear the cookie
  console.log("logtestes");
  req.session.destroy((err) => {
    if (err) {
      res.render("pages/error", {
        error: err.message,
        title: "Cannot logout",
      });
    } else {
      console.log("logged out");
      res.clearCookie("mrcoffee_sid");
      res.redirect("/login");
    }
  });
});
module.exports = router;
