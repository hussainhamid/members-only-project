const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const db = require("../db/query");

//new LocalStrategy here
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.getEverything(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      console.error("something went wrong in localStrategy: ", err);
      return done(err);
    }
  })
);

//serialize and deserialize function here

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

    const user = rows[0];

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    console.error("error in deserialize user: ", err);
    done(err);
  }
});
