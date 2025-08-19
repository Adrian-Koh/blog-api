const { Router } = require("express");
const postsRouter = Router();

const postsController = require("../controllers/postsController");

postsRouter.get("/", (req, res, next) => {
  res.send("GET all posts");
});

postsRouter.get("/:postId", (req, res, next) => {
  const { postId } = req.params;
  res.send("GET post id " + postId);
});

postsRouter.post("/:postId", (req, res, next) => {
  const { postId } = req.params;
  res.send("POST post id " + postId);
});

postsRouter.put("/:postId", (req, res, next) => {
  const { postId } = req.params;
  res.send("PUT post id " + postId);
});

postsRouter.delete("/:postId", (req, res, next) => {
  const { postId } = req.params;
  res.send("DELETE post id " + postId);
});

module.exports = postsRouter;
