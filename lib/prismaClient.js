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

async function addPost(userid, title, text, addedTime, publish) {
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        text: text,
        addedTime: addedTime,
        userId: userid,
        isPublished: publish,
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}

module.exports = { addUser, getUserById, getUserByUsername };
