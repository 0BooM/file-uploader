const { Router } = require("express");
const FolderRouter = Router();
const FolderController = require("../controllers/FolderController.js");
const authentication = require("../utils/authMiddleware.js");

FolderRouter.get(
  "/:id/create-folder",
  authentication.isAuthenticated,
  FolderController.getCreateFolderForm
);
FolderRouter.post(
  "/:id/create-folder",
  authentication.isAuthenticated,
  FolderController.postCreateFolderForm
);

FolderRouter.get(
  "/folder/:id",
  authentication.isAuthenticated,
  FolderController.getFolderPage
);

module.exports = FolderRouter;
