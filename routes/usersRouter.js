const { Router } = require("express");
const usersRouter = Router();

const usersController = require("../controllers/usersController");

usersRouter.get("/login", (req, res, next) => {
  res.send("GET login");
});

usersRouter.post("/login", (req, res, next) => {
  res.send("POST login");
});

usersRouter.get("/signup", (req, res, next) => {
  res.send("GET signup");
});

usersRouter.post("/signup", (req, res, next) => {
  res.send("POST signup");
});

module.exports = usersRouter;
