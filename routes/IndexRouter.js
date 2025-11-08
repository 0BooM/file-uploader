const { Router } = require("express");
const IndexRouter = Router();
const IndexController = require("../controllers/IndexController");

IndexRouter.get("/", IndexController.getIndexPage)

module.exports = IndexRouter;