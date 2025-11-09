const { Router } = require("express");
const LoginRegisterRouter = Router();
const LoginRegisterController = require("../controllers/LoginRegisterController")

LoginRegisterRouter.get("/login", LoginRegisterController.getLoginForm);
LoginRegisterRouter.post("/login", LoginRegisterController.postLoginForm);

LoginRegisterRouter.get("/sign-up", LoginRegisterController.getRegisterForm);
LoginRegisterRouter.post("/sign-up", LoginRegisterController.postRegisterForm);

LoginRegisterRouter.get("/logout", LoginRegisterController.getLogout);

module.exports = LoginRegisterRouter