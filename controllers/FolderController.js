const db = require("../dbQueries/folderQueries");

exports.getCreateFolderForm = (req, res) => {
  res.render("./foldersManagment/folderCreateForm");
};

exports.postCreateFolderForm = async (req, res) => {
  try {
    const folderName = req.body.name;
    const userId = req.params.id;

    // Security check: ensure user can only create folders for themselves
    if (Number(userId) !== req.user.id) {
      return res.status(403).render("404");
    }

    await db.createNewFolder(userId, folderName);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("404");
  }
};

exports.getFolderPage = async (req, res) => {
  try {
    const folderId = req.params.id;
    const folder = await db.getFolderWithFiles(folderId);
    console.log(folder);
    if (!folder) {
      return res.status(404).render("404");
    }

    // Security check: ensure user can only access their own folders
    if (folder.userId !== req.user.id) {
      return res.status(403).render("404"); // Forbidden - but show 404 to not reveal folder existence
    }

    res.render("foldersManagment/folder", { folder });
  } catch (error) {
    res.status(500).render("404");
  }
};
