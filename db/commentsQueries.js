const prisma = require("./prisma");

async function getAllComments(postId) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
      include: {
        user: true,
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
      include: {
        user: true,
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

async function editComment(commentId, text, editedTime = new Date()) {
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: {
        text: text,
        editedTime: editedTime,
      },
    });
    return comment;
  } catch (err) {
    throw err;
  }
}

async function deleteComment(commentId) {
  try {
    const comment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });
    return comment;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
};
