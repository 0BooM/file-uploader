const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const PORT = 3000;

const multer = require("multer");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Assign res.locals = user to use user in views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Index router
const IndexRouter = require("./routes/IndexRouter");
app.use("/", IndexRouter);

//Login router
const LoginRegisterRouter = require("./routes/LoginRegisterRouter");
app.use("/", LoginRegisterRouter);

//File router
const FileRouter = require("./routes/FileRouter");
app.use("/", FileRouter);

//Folder router
const FolderRouter = require("./routes/FolderRouter");
app.use("/", FolderRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).render("filesManagment/fileUploadForm", {
      error: "File is too large. Maximum size is 20MB.",
    });
  }
  next(err);
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("Listening on port:", PORT);
});
