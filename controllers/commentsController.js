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

module.exports = { allCommentsGet };
