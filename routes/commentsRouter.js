const { Router } = require("express");
const commentsRouter = Router();

const commentsController = require("../controllers/commentsController");

commentsRouter.get("/:postId/comments", (req, res, next) => {
  const { postId } = req.params;
  res.send("GET all comments from post " + postId);
});

commentsRouter.get("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("GET post id " + postId + " comment id " + commentId);
});

commentsRouter.post("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("POST post id " + postId + " comment id " + commentId);
});

commentsRouter.put("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("PUT post id " + postId + " comment id " + commentId);
});

commentsRouter.delete("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("DELETE post id " + postId + " comment id " + commentId);
});

module.exports = commentsRouter;
