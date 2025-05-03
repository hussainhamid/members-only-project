const {
  sendMessageGet,
  sendMessagePost,
} = require("../controllers/sendMessageController");
const Router = require("express");
const sendMesageRouter = Router();

sendMesageRouter.get("/", sendMessageGet);
sendMesageRouter.post("/", sendMessagePost);

module.exports = {
  sendMesageRouter,
};
