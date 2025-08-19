const jwt = require("jsonwebtoken");
const { addUser, getUserByUsername } = require("../lib/prismaClient");
const { generatePasswordHash, validPassword } = require("../lib/passwordUtils");
require("dotenv").config();

async function loginGet(req, res, next) {
  // serve login form
  res.send("GET login");
}

function loginPost(req, res, next) {
  const { username, password } = req.body;
  getUserByUsername(username)
    .then((user) => {
      if (validPassword(password, user.passwordHash)) {
        jwt.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: "7d" },
          (err, token) => {
            if (err) {
              next(err);
            }
            res.json({ token });
          }
        );
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      next(err);
    });
}

async function signupGet(req, res, next) {
  // serve signup form
  res.send("GET signup");
}

function signupPost(req, res, next) {
  const { username, password } = req.body;
  const passwordHash = generatePasswordHash(password);
  addUser(username, passwordHash)
    .then((user) => {
      res.json({
        message: "signup success",
        user,
      });
      //res.redirect("/users/login");
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { loginGet, loginPost, signupGet, signupPost };
