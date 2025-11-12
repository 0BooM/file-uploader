const { Router } = require("express");
const ShareRouter = Router();
const ShareController = require("../controllers/ShareController");
const authentication = require("../utils/authMiddleware.js");

// Routes for authenticated users to create shares
ShareRouter.get(
  "/folder/:folder_id/share",
  authentication.isAuthenticated,
  ShareController.getShareForm
);

ShareRouter.post(
  "/folder/:folder_id/share",
  authentication.isAuthenticated,
  ShareController.postShareForm
);

// Public route for accessing shared folders (no authentication required)
ShareRouter.get("/share/:share_id", ShareController.getSharedFolder);

module.exports = ShareRouter;
