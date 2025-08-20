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

async function getComment(commentId) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });
    return comment;
  } catch (err) {
    throw err;
  }
}

async function addComment(userId, postId, text, addedTime = new Date()) {
  try {
    const comment = await prisma.comment.create({
      data: {
        text: text,
        addedTime: addedTime,
        userId: Number(userId),
        postId: Number(postId),
      },
    });
    return comment;
  } catch (err) {
    throw err;
  }
}

async function editComment() {}

async function deleteComment() {}

module.exports = { getAllComments, getComment, addComment };
