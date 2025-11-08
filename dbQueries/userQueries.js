const prisma = require("../index");

exports.findUserByUsername = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};
