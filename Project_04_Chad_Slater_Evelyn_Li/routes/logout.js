const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //remove the entire session
  //clear the cookie
  req.session.destroy((err) => {
    if (err) {
      res.render("error", {
        error: err.message,
        title: "Cannot logout",
      });
    } else {
      res.clearCookie("mrcoffee_sid");
      res.redirect("/login");
    }
  });
});
module.exports = router;
