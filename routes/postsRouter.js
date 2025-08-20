const { Router } = require("express");
const postsRouter = Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../lib/jwtUtils");

const postsController = require("../controllers/postsController");

postsRouter.get("/", (req, res, next) => {
  res.send("GET all posts");
});

postsRouter.get("/:postId", postsController.postsIdGet);

postsRouter.post("/", verifyToken, postsController.postsPost);

postsRouter.put("/:postId", verifyToken, postsController.postsPut);

postsRouter.delete("/:postId", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { postId } = req.params;
      res.json({
        message: "DELETE post id " + postId,
      });
    }
  });
});

module.exports = postsRouter;
