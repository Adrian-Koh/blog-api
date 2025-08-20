const { Router } = require("express");
const postsRouter = Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../lib/jwtUtils");

const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.postsGet);

postsRouter.get("/:postId", postsController.postsIdGet);

postsRouter.post("/", verifyToken, postsController.postsPost);

postsRouter.put("/:postId", verifyToken, postsController.postsPut);

postsRouter.delete("/:postId", verifyToken, postsController.postsDelete);

module.exports = postsRouter;
