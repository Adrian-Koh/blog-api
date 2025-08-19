const { Router } = require("express");
const postsRouter = Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../lib/jwtUtils");

const postsController = require("../controllers/postsController");

postsRouter.get("/", (req, res, next) => {
  res.send("GET all posts");
});

postsRouter.get("/:postId", (req, res, next) => {
  const { postId } = req.params;
  res.send("GET post id " + postId);
});

postsRouter.post("/", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const userId = authData.user.id;
      const { title, text, publish } = req.body;
      const addedTime = new Date();
      res.json({
        message: `POST from user ${userId}, title: ${title}, text: ${text}, addedTime: ${addedTime.toLocaleDateString()}, ${addedTime.toLocaleTimeString()}, publish: ${publish}`,
      });
      // TODO: add to prisma
    }
  });
});

postsRouter.put("/:postId", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { postId } = req.params;
      res.json({
        message: "PUT post id " + postId,
      });
    }
  });
});

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
