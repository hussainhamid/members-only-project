const db = require("../db/query");

async function deleteMessageController(req, res) {
  const { id } = req.params;

  await db.deleteMessage(id);

  res.redirect("/");
}

module.exports = {
  deleteMessageController,
};
