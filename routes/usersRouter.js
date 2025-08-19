const { Router } = require("express");
const usersRouter = Router();
const passport = require("passport");
const usersController = require("../controllers/usersController");

usersRouter.get("/login", usersController.loginGet);

usersRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failed-auth", // todo: failure redirect page on frontend
    successRedirect: "/",
  })
);

usersRouter.get("/signup", usersController.signupGet);

usersRouter.post("/signup", usersController.signupPost);

module.exports = usersRouter;
