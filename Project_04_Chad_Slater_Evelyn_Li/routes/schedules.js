const express = require("express");
const router = express.Router();

const db = require("../database");
const helper = require("../helper");

const { protectedRoute } = require("../middleware/protectedRoute");

// Get all schedules
router.get("/", protectedRoute, (req, res) => {
  // if (!req.session.userID) {
  //   return res.redirect("/login");
  // }

  db.any("SELECT * FROM schedule")
    .then((schedule) => {
      res.render("schedules", {
        title: "Schedules",
        schedule,
        helper,
      });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", {
        title: "Error",
        errorCode: 500,
        errorMessage: error.message,
      });
    });
});

module.exports = router;
