const prisma = require("../index");

exports.findUserByUsername = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};

exports.createUser = async (username, password) => {
  // Return user for automatically logging in after registration
  return await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })
}

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id},
    include: { folders: true }
  });
}