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

function userPostsGet(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      next(err);
    } else {
      postsQueries
        .getAllUserPosts(authData.user.id)
        .then((posts) => {
          res.json({
            posts,
            user: authData.user,
          });
        })
        .catch((err) => next(err));
    }
  });
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

      if (
        typeof req.body.title !== "undefined" &&
        typeof req.body.text !== "undefined" &&
        typeof req.body.publish !== "undefined"
      ) {
        // edit post
        const { title, text, publish } = req.body;
        const editedTime = new Date();
        postsQueries
          .updatePost(postId, title, text, editedTime, publish)
          .then((post) => {
            res.json({ post });
          })
          .catch((err) => next(err));
      } else if (typeof req.body.publish !== "undefined") {
        // publish/unpublish post
        const { publish } = req.body;
        postsQueries
          .publishPost(postId, publish)
          .then((post) => {
            res.json({ post });
          })
          .catch((err) => next(err));
      }
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
      // TODO: delete comments
    }
  });
}

module.exports = {
  postsGet,
  userPostsGet,
  postsIdGet,
  postsPost,
  postsPut,
  postsDelete,
};
