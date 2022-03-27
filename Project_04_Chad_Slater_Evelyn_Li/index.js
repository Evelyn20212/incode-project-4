require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routers
const loginRouter = require("./routes/login");
app.use("/", loginRouter);

const schedulesRouter = require("./routes/schedules");
app.use("/schedules", schedulesRouter);

const newSchedulesRouter = require("./routes/schedules-new");
app.use("/new", newSchedulesRouter);

const errorRouter = require("./routes/error");
app.use("*", errorRouter);

app.listen(PORT, () => {
  console.log(`Schedule app listening at http://localhost:${PORT}/`);
});
