const passport = require("passport");

require("../config/passport");

async function logInGet(req, res) {
  res.render("logIn", { currentUser: req.user });
}

async function logInPost(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })(req, res, next);
}

module.exports = {
  logInGet,
  logInPost,
};
