const jwt = require("jsonwebtoken");
const postsQueries = require("../db/postsQueries");

function postsGet(req, res, next) {
  postsQueries
    .getAllPosts()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => next(err));
}

function postsIdGet(req, res, next) {
  const { postId } = req.params;
  postsQueries
    .getPostById(postId)
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

      postsQueries
        .addPost(authData.user.id, title, text, addedTime, publish)
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
      postsQueries
        .updatePost(postId, title, text, editedTime, publish)
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => next(err));
    }
  });
}

function postsDelete(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      const { postId } = req.params;
      postsQueries
        .deletePost(postId)
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => next(err));
    }
  });
}

module.exports = { postsGet, postsIdGet, postsPost, postsPut, postsDelete };
