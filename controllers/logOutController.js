require("../config/passport");

async function logOutUser(req, res) {
  req.logout((err) => {
    if (err) {
      console.error("error in logOutController: ", err);
    }
    res.redirect("/");
  });
}

module.exports = { logOutUser };
