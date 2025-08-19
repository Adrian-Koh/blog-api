const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/login", usersController.loginGet);

usersRouter.post("/login", usersController.loginPost);

usersRouter.get("/signup", usersController.signupGet);

usersRouter.post("/signup", usersController.signupPost);

module.exports = usersRouter;
