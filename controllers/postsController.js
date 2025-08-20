const jwt = require("jsonwebtoken");
const { addPost, getPostById, updatePost } = require("../lib/prismaClient");

function postsIdGet(req, res, next) {
  const { postId } = req.params;
  getPostById(postId)
    .then((post) => {
      res.json({
        post,
      });
    })
    .catch((err) => next(err));
}

function postsPost(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { title, text, publish } = req.body;
      const addedTime = new Date();

      addPost(authData.user.id, title, text, addedTime, publish)
        .then((post) => {
          res.json({
            post,
          });
        })
        .catch((err) => next(err));
    }
  });
}

function postsPut(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { postId } = req.params;
      const { title, text, publish } = req.body;
      const editedTime = new Date();
      updatePost(postId, title, text, editedTime, publish)
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => next(err));
    }
  });
}

module.exports = { postsIdGet, postsPost, postsPut };
