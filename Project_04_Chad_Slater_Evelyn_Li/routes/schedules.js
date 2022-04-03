const express = require("express");
const router = express.Router();

const db = require("../database");

const { protectedRoute } = require("../middleware/protectedRoute");

// Get all schedules
router.get("/", protectedRoute, (req, res) => {
  db.any(
    "SELECT * FROM schedule LEFT JOIN users ON schedule.user_id = users.id"
  )
    .then((schedule) => {
      res.render("schedules", {
        title: "Schedules",
        schedule,
      });
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
