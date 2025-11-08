const { Router } = require("express");
const LoginRegisterRouter = Router();
const LoginRegisterController = require("../controllers/LoginRegisterController")

LoginRegisterRouter.get("/login", LoginRegisterController.getLoginForm)

module.exports = LoginRegisterRouter