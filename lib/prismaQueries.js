const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

async function getPosts() {
  const posts = await prisma.post.findMany();
  console.log(posts);
}

async function getComments() {
  const comments = await prisma.comment.findMany();
  console.log(comments);
}

getPosts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
