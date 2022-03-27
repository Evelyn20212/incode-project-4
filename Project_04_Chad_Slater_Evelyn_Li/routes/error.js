const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("error", {
    title: "Error",
    errorCode: 404,
    errorMessage: "This page does not exist.",
  });
});

module.exports = router;
