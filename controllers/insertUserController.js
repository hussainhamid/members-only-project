const db = require("../db/query");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function insertUserControllerGet(req, res) {
  res.render("signUp");
}

async function insertUserControllerPost(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insertUser(req.body.username, req.body.email, hashedPassword);

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sign-up",
    })(req, res, next);
  } catch (err) {
    console.error("error happened in insertUserControllerPost", err);

    res.render("signUp", { sameUsername: true });
  }
}

module.exports = {
  insertUserControllerGet,
  insertUserControllerPost,
};
