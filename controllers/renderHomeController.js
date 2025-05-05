const db = require("../db/query");

async function renderHome(req, res) {
  if (req.user) {
    const { rows } = await db.joinTables();

    res.render("index", {
      user: rows,
      currentUser: req.user,
      sameUsername: false,
    });
  } else {
    res.render("signUp", { sameUsername: false });
  }
}

module.exports = { renderHome };
