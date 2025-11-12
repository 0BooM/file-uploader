const multer = require("../multer");
const db = require("../dbQueries/fileQueries");
const supabase = require("../supabaseClient");

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

    // Sanitize filename for Supabase Storage
    const sanitizedFilename = file.originalname
      .replace(/[^a-zA-Z0-9.\-_]/g, "_") // Replace special chars with underscore
      .replace(/_{2,}/g, "_"); // Replace multiple underscores with single underscore

    const filePath = `user_${userId}/folder_${folderId}/${sanitizedFilename}`;
    const { data, error: uploadError } = await supabase.storage
      .from("file_uploader_bucket")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      return res.status(500).render("filesManagment/fileUploadForm", {
        error: uploadError.message,
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from("file_uploader_bucket")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    await db.createFile(
      file.originalname,
      file.size,
      publicUrl,
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

exports.downloadFile = async (req, res) => {
  try {
    const fileId = req.params.file_id;
    const userId = req.user.id;

    // Get file info from database
    const file = await db.getFileById(fileId, userId);

    if (!file) {
      return res.status(404).render("404");
    }

    // Redirect to the public URL for download
    res.redirect(file.publicUrl);
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).render("404");
  }
};
