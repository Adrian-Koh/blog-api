const prisma = require("./prisma");

async function getAllComments(postId) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });
    return comments;
  } catch (err) {
    throw err;
  }
}

async function getComment() {}

async function addComment() {}

async function editComment() {}

async function deleteComment() {}

module.exports = { getAllComments };
