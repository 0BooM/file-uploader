const prisma = require("../index");

exports.createNewFolder = async (userId, name) => {
  return await prisma.folder.create({
    data: {
      name: name,
      userId: Number(userId),
    },
  });
};

exports.getFolderWithFiles = async (folderId) => {
  const folder = await prisma.folder.findUnique({
    where: { id: Number(folderId) },
    include: { files: true },
  });
  console.log(folder);
  return folder;
};
