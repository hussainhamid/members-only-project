const {
  deleteMessageController,
} = require("../controllers/deleteMessageController");

const Router = require("express");

const deleteMessageRouter = Router();

deleteMessageRouter.get("/:id", deleteMessageController);

module.exports = { deleteMessageRouter };
