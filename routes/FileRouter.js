const { Router } = require("express");
const FileRouter = Router();
const FileController = require("../controllers/FileController");
const authentication = require("../utils/authMiddleware.js");
const multer = require("../multer");

FileRouter.get(
  "/folder/:folder_id/upload-file",
  authentication.isAuthenticated,
  FileController.getFileUploadForm
);

FileRouter.post(
  "/folder/:folder_id/upload-file",
  authentication.isAuthenticated,
  multer.single("uploadFile"),
  FileController.postFileUploadForm
);

module.exports = FileRouter;
