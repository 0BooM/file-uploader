const multer = require("../multer");
const db = require("../dbQueries/fileQueries");

exports.getFileUploadForm = (req, res) => {
  res.render("./filesManagment/fileUploadForm", { error: null });
};

exports.postFileUploadForm = async (req, res) => {
  try {
    let error = null;
    const folderId = req.params.folder_id;
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      error = "No file uploaded.";
      return res.status(400).render("filesManagment/fileUploadForm", {
        error: error,
      });
    }
    console.log(file);
    await db.createFile(
      file.originalname,
      file.size,
      Number(folderId),
      Number(userId)
    );

    res.redirect(`/folder/${folderId}`);
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).render("filesManagment/fileUploadForm", {
        error: "File is too large. Maximum size is 20MB.",
      });
    }
    return res.status(403).render("404");
  }
};
