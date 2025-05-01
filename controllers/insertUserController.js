const db = require("../db/query");
const bcrypt = require("bcryptjs");

async function insertUserControllerGet(req, res) {
  res.render("signUp");
}

async function insertUserControllerPost(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insertUser(req.body.username, req.body.email, hashedPassword);

    res.redirect("/");
  } catch (err) {
    console.error("error happened in insertUserControllerPost", err);
  }
}

module.exports = {
  insertUserControllerGet,
  insertUserControllerPost,
};
