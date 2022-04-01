require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const twentyFourHours = 1000 * 60 * 60 * 24;
app.use(
  session({
    name: "mrcoffee_sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: twentyFourHours },
  })
);

// local middleware

function locals(req, res, next) {
  res.locals.session = req.session;
  console.log(res.locals.session);
  next();
}

app.use(locals);
// Routers

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const schedulesRouter = require("./routes/schedules");
app.use("/", schedulesRouter);

const newSchedulesRouter = require("./routes/schedules-new");
app.use("/new", newSchedulesRouter);

const signUpRouter = require("./routes/signup");
app.use("/signup", signupRouter);

const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);

const errorRouter = require("./routes/error");
app.use("*", errorRouter);

app.listen(PORT, () => {
  console.log(`Schedule app listening at http://localhost:${PORT}/`);
});
