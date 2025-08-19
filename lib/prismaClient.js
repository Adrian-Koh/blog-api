const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

function addUser(username, passwordHash) {
  prisma.user
    .create({
      data: {
        username,
        passwordHash,
      },
    })
    .catch((err) => {
      throw err;
    });
}

function getUserById(userid) {
  prisma.user
    .findUnique({
      where: {
        id: Number(userid),
      },
    })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      throw err;
    });
}

function getUserByUsername(username) {
  prisma.user
    .findUnique({
      where: {
        username: username,
      },
    })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = { addUser, getUserById, getUserByUsername };
