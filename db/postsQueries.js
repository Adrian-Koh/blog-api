const prisma = require("./prisma");

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
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

async function deletePost(postId) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return post;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAllPosts, getPostById, addPost, updatePost, deletePost };
