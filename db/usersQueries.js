const prisma = require("./prisma");

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

module.exports = { addUser, getUserById, getUserByUsername };
