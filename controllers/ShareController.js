const db = require("../dbQueries/shareQueries");

exports.getShareForm = async (req, res) => {
  const folderId = req.params.folder_id;
  res.render("foldersManagment/shareForm", { folderId: folderId, error: null });
};

exports.postShareForm = async (req, res) => {
  try {
    const folderId = parseInt(req.params.folder_id);
    const { duration } = req.body;

    if (!duration || !parseInt(duration)) {
      return res.render("foldersManagment/shareForm", {
        folderId: folderId,
        error: "Please enter a valid duration in days.",
      });
    }

    const days = parseInt(duration);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    const sharedFolder = await db.createSharedFolder(folderId, expiresAt);

    const shareUrl = `${req.protocol}://${req.get("host")}/share/${
      sharedFolder.id
    }`;

    res.render("foldersManagment/shareSuccess", {
      shareUrl: shareUrl,
      expiresAt: expiresAt,
      duration: days,
    });
  } catch (error) {
    console.error("Share creation error:", error);
    res.render("foldersManagment/shareForm", {
      folderId: req.params.folder_id,
      error: "Failed to create share link. Please try again.",
    });
  }
};

exports.getSharedFolder = async (req, res) => {
  try {
    const shareId = req.params.share_id;

    // Clean up expired shares first
    await db.deleteExpiredShares();

    const sharedFolder = await db.getSharedFolder(shareId);

    if (!sharedFolder) {
      return res.status(404).render("404", {
        message: "This shared folder link is invalid or has expired.",
      });
    }

    // Check if the share has expired
    if (new Date() > sharedFolder.expiresAt) {
      return res.status(404).render("404", {
        message: "This shared folder link has expired.",
      });
    }

    res.render("foldersManagment/sharedFolder", {
      folder: sharedFolder.folder,
      expiresAt: sharedFolder.expiresAt,
      sharedBy: sharedFolder.folder.user.username,
    });
  } catch (error) {
    console.error("Shared folder access error:", error);
    res.status(500).render("404", {
      message: "An error occurred while accessing the shared folder.",
    });
  }
};
