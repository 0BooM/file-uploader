const prisma = require("../index");

exports.createSharedFolder = async (folderId, expiresAt) => {
  return await prisma.sharedFolder.create({
    data: {
      folderId: folderId,
      expiresAt: expiresAt,
    },
  });
};

exports.getSharedFolder = async (shareId) => {
  return await prisma.sharedFolder.findUnique({
    where: {
      id: shareId,
    },
    include: {
      folder: {
        include: {
          files: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
};

exports.deleteExpiredShares = async () => {
  return await prisma.sharedFolder.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};

exports.getUserSharedFolders = async (userId) => {
  return await prisma.sharedFolder.findMany({
    where: {
      folder: {
        userId: userId,
      },
    },
    include: {
      folder: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
