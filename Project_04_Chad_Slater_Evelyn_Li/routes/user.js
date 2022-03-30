const express = require("express");
const router = express.Router();

const db = require("../database");
const helper = require("../helper");

// Get all schedules
router.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  if (!req.session.userID) {
    return res.redirect("/login");
  }

  db.any("SELECT * FROM schedule WHERE user_id = $1", [user_id])
    .then((schedule) => {
      res.render("user", {
        title: "User",
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
