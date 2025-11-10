const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const PORT = 3000;

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

//Folder router
const FolderRouter = require("./routes/FolderRouter");
app.use("/", FolderRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("Listening on port:", PORT);
});
