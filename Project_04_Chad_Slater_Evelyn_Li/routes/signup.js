const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// create regex
const nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^[^<>]{6,}$/;

isValid = (input, regex) => {
  return regex.test(input);
};

router
  .route("/")
  .get((req, res) => {
    res.render("signup", {
      title: "Sign up",
    });
  })
  .post((req, res) => {
    const { surname, firstname, email, password, confirmPassword } = req.body;
    let validationError = "";

    if (!surname || !firstname || !email || !password || !confirmPassword) {
      validationError = "Please fill out all fields";
    }
    // Test regex
    else if (!isValid(surname, nameRegex)) {
      validationError = "Invalid first name";
    } else if (!isValid(firstname, nameRegex)) {
      validationError = "Invalid last name";
    } else if (!isValid(email, emailRegex)) {
      validationError = "Invalid email";
    } else if (!isValid(password, passwordRegex)) {
      validationError = "Invalid password";
    } else if (password !== confirmPassword) {
      validationError = "Password does not match";
    }

    if (validationError.length > 0) {
      return res.render("error", {
        title: "Error",
        errorCode: 500,
        errorMessage: "Invalid input",
      });
    }

    const cleanedEmail = email.toLowerCase().trim();

    // Chekc if email already exists before inserting
    db.oneOrNone("SELECT * FROM users WHERE email = $1", [cleanedEmail]).then(
      (user) => {
        if (user) {
          res.render("error", {
            title: "Error",
            errorCode: 500,
            errorMessage: "User already exists",
          });
          //if all valid and email not exist, has password and insert into db
        } else {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(password, salt);

          db.none(
            "INSERT INTO users(id, surname, firstname, email, password) VALUES ($1,$2,$3,$4,$5)",
            [uuidv4(), surname, firstname, cleanedEmail, hash]
          )
            .then(() => {
              res.redirect("/");
            })

            .catch((error) => {
              res.render("error", {
                title: "Error",
                errorCode: "500",
                errorMessage: error.message,
              });
            });
        }
      }
    );
  });

module.exports = router;
