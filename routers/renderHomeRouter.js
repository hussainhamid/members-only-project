const { renderHome } = require("../controllers/renderHomeController");

const Router = require("express");

const renderHomeRouter = Router();

renderHomeRouter.get("/", renderHome);

module.exports = { renderHomeRouter };
