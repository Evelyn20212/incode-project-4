const express = require("express");
const router = express.Router();

const db = require("../database");

// Get new schedule form
router
  .get("/", (req, res) => {
    res.render("schedules-new", {
      title: "New Schedule",
    });
  })
  .post((req, res) => {
    const { username, day_of_week, start_time, end_time } = req.body;

    db.none(
      "INSERT INTO schedules(id_user, day_of_week, start_time, end_time) VALUES($1, $2, $3, $4)",
      [username, day_of_week, start_time, end_time]
    )
      .then(() => {
        res.redirect("/");
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
