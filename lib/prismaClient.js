const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function addUser(username, passwordHash) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserById(userid) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userid),
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function addPost(
  userid,
  title,
  text,
  addedTime = new Date(),
  publish = false
) {
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        text: text,
        addedTime: addedTime,
        userId: Number(userid),
        isPublished: Boolean(publish),
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}

async function getPostById(postId) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}

async function updatePost(
  postId,
  title,
  text,
  editedTime = new Date(),
  publish = false
) {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: title,
        text: text,
        editedTime: editedTime,
        isPublished: Boolean(publish),
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  addPost,
  getPostById,
  updatePost,
};
