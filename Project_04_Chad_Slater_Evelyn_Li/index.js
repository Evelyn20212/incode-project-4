require("dotenv").config();

const express = require("express");
const path = require("path");

const db = require("./database");
const helper = require("./helper");

const app = express();
const PORT = process.env.PORT || 3000;

const bcryptjs = require('bcryptjs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Create initial encrypted password
let salt = bcryptjs.genSaltSync(10);
let hash = bcryptjs.hashSync('password', salt);
console.log(hash) // $2a$10$yfjboBh5N1GcL.R2EzhVYu39MB7EsSiXCXckhFpiyPAs.FlUmFjhy

// Get all schedules
app.get("/", (req, res) => {
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

// Get new schedule form
app.get("/new", (req, res) => {
  res.render("schedules-new", {
    title: "New Schedule",
  });
});

// Post new schedule
app.post("/new", (req, res) => {
  const { username, day_of_week, start_time, end_time } = req.body;

  db.none(
    "INSERT INTO schedule(username, day_of_week, start_time, end_time) VALUES($1, $2, $3, $4)",
    [username, day_of_week, start_time, end_time]
  )
    .then(() => {
      res.redirect("/new");
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

// 404
app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    errorCode: 404,
    errorMessage: "This page does not exist.",
  });
});

app.listen(PORT, () => {
  console.log(`Schedule app listening at http://localhost:${PORT}/`);
});
