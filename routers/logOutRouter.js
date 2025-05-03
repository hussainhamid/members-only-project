const { logOutUser } = require("../controllers/logOutController");
const Router = require("express");
const logOutRouter = Router();

logOutRouter.get("/", logOutUser);

module.exports = {
  logOutRouter,
};
