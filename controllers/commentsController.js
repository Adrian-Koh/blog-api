const jwt = require("jsonwebtoken");
const commentsQueries = require("../db/commentsQueries");

function allCommentsGet(req, res, next) {
  const { postId } = req.params;
  commentsQueries
    .getAllComments(postId)
    .then((comments) => {
      res.json({ comments });
    })
    .catch((err) => next(err));
}

function commentGet(req, res, next) {
  const { commentId } = req.params;
  commentsQueries
    .getComment(commentId)
    .then((comment) => {
      res.json({ comment });
    })
    .catch((err) => next(err));
}

function commentPost(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { postId } = req.params;
      const { comment } = req.body;
      const addedTime = new Date();
      commentsQueries
        .addComment(authData.user.id, postId, comment, addedTime)
        .then((comment) => {
          res.json({ comment });
        })
        .catch((err) => next(err));
    }
  });
}

function commentPut(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { commentId } = req.params;
      const { comment } = req.body;
      const editedTime = new Date();
      commentsQueries
        .editComment(commentId, comment, editedTime)
        .then((comment) => {
          res.json({ comment });
        })
        .catch((err) => next(err));
    }
  });
}

module.exports = { allCommentsGet, commentGet, commentPost, commentPut };
