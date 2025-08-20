const { Router } = require("express");
const commentsRouter = Router();
const { verifyToken } = require("../lib/jwtUtils");

const commentsController = require("../controllers/commentsController");

commentsRouter.get("/:postId/comments", commentsController.allCommentsGet);

commentsRouter.get(
  "/:postId/comments/:commentId",
  commentsController.commentGet
);

commentsRouter.post(
  "/:postId/comments/",
  verifyToken,
  commentsController.commentPost
);

commentsRouter.put("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("PUT post id " + postId + " comment id " + commentId);
});

commentsRouter.delete("/:postId/comments/:commentId", (req, res, next) => {
  const { postId, commentId } = req.params;
  res.send("DELETE post id " + postId + " comment id " + commentId);
});

module.exports = commentsRouter;
