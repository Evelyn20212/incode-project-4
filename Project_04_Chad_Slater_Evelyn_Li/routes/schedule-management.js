const express = require("express");
const router = express.Router();

const db = require("../database");
const { protectedRoute } = require("../middleware/protectedRoute");

// Get new schedule page
// Post new schedule
router
  .route("/")
  .get("/", protectedRoute, (req, res) => {
    res.render("schedule-management", {
      title: "New Schedule",
    });
  })
  .post((req, res) => {
    const { day_of_week, start_time, end_time } = req.body;

    db.none(
      "INSERT INTO schedule(user_id, day_of_week, start_time, end_time) VALUES($1, $2, $3, $4)",
      [user_id, day_of_week, start_time, end_time]
    )
      .then(() => {
        res.redirect("/schedule-management");
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
