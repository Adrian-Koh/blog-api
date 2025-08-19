const { addUser } = require("../lib/prismaClient");
const { generatePasswordHash } = require("../lib/passwordUtils");

async function loginGet(req, res, next) {
  // serve login form
  res.send("GET login");
}

async function signupGet(req, res, next) {
  // serve signup form
  res.send("GET signup");
}

function signupPost(req, res, next) {
  const { username, password } = req.body;
  const passwordHash = generatePasswordHash(password);
  addUser(username, passwordHash)
    .then(() => {
      res.redirect("/users/login");
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { loginGet, signupGet, signupPost };
