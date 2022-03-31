const express = require("express");
const router = express.Router();

const db = require("../database");

// Get new schedule page
// Post new schedule
router
  .get("/", (req, res) => {
    if (!req.session.userID) {
      return res.redirect("/login");
    }
    res.render("schedule-management", {
      title: "New Schedule",
    });
  })
  .post((req, res) => {
    const { day_of_week, start_time, end_time } = req.body;

    db.none(
      "INSERT INTO schedules(day_of_week, start_time, end_time) VALUES($2, $3, $4)",
      [day_of_week, start_time, end_time]
    )
      .then(() => {
        res.redirect("/schedule-management");
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
