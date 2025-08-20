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

commentsRouter.put(
  "/:postId/comments/:commentId",
  verifyToken,
  commentsController.commentPut
);

commentsRouter.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  commentsController.commentDelete
);

module.exports = commentsRouter;
