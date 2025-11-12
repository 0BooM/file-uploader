const prisma = require("../index");

exports.createFile = async (filename, size, publicUrl, folderId, userId) => {
  await prisma.file.create({
    data: {
      name: filename,
      size: size,
      publicUrl: publicUrl,
      folderId: folderId,
      userId: userId,
    },
  });
};

exports.getFileById = async (fileId, userId) => {
  return await prisma.file.findFirst({
    where: {
      id: Number(fileId),
      userId: userId,
    },
  });
};
