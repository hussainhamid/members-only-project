const Router = require("express");

const logInRouter = Router();

const { logInGet, logInPost } = require("../controllers/logInController");

logInRouter.get("/", logInGet);

logInRouter.post("/", logInPost);

module.exports = {
  logInRouter,
};
