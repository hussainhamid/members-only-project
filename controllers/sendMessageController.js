const db = require("../db/query");

async function sendMessageGet(req, res) {
  res.render("message");
}

async function sendMessagePost(req, res) {
  try {
    await db.insertMessage(req.user.id, req.body.title, req.body.message);

    res.redirect("/");
  } catch (err) {
    console.error("error in sendMessageController: ", err);
  }
}

module.exports = {
  sendMessageGet,
  sendMessagePost,
};
