const prisma = require("../index");

exports.createFile = async (filename, size, folderId, userId) => {
    await prisma.file.create({
        data: {
            name: filename,
            size: size,
            folderId: folderId,
            userId: userId
        }
    })
};