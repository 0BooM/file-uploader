const bcrypt = require("bcryptjs");
const db = require("../dbQueries/userQueries");
const passport = require("../passport");
const { use } = require("passport");

exports.getLoginForm = (req, res) => {
  try {
    res.render("./authentication/loginForm");
  } catch (error) {
    res.status(404).render("404");
  }
};
exports.postLoginForm = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        res.render("/login", { error: info.message });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    })(req, res, next);
  } catch (err) {
    res.status(500).render("404");
  }
};

exports.getRegisterForm = (req, res) => {
  try {
    res.render("./authentication/signupForm", {error: null});
  } catch (error) {
    res.status(404).render("404");
  }
};

exports.postRegisterForm = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await db.createUser(req.body.username, hashedPassword);
      console.log("Tried to create an account");
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
        return res
          .status(400)
          .render("./authentication/signupForm", {
            error: "Username already exists",
          });
    }
    // Handle duplicate username or other errors
    res.status(500).render("404");
  }
};

exports.getLogout = (req, res, next) => {
    req.logout((error) => {
        if (error) return error;
        res.redirect("/");
    })
}