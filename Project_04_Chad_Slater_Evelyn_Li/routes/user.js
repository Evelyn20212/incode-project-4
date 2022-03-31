const express = require("express");
const router = express.Router();

const db = require("../database");
const helper = require("../helper");

// Get single user and their schedules
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  if (!req.session.userID) {
    return res.redirect("/login");
  }

  try {
    const schedule = await db.any("SELECT * FROM schedule WHERE user_id = $1", [
      user_id,
    ]);
    const user = await db.one("SELECT * FROM users WHERE id = $1", [user_id]);

    res.render("user", {
      helper,
      schedule,
      title: `User ${user_id}`,
      user,
    });
  } catch (err) {
    res.render("error", {
      title: "Error",
      errorCode: 500,
      errorMessage: err.message,
    });
  }
});

module.exports = router;
