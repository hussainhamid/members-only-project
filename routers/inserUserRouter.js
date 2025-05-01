const Router = require("express");

const {
  insertUserControllerGet,
  insertUserControllerPost,
} = require("../controllers/insertUserController");

const inserUserRouter = Router();

inserUserRouter.get("/", insertUserControllerGet);

inserUserRouter.post("/", insertUserControllerPost);

module.exports = {
  inserUserRouter,
};
