require("dotenv").config();
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(expressSession);
require("./config/passport");

// exports

const { inserUserRouter } = require("./routers/inserUserRouter");
const { logInRouter } = require("./routers/logInRouter");
const { logOutRouter } = require("./routers/logOutRouter");
const { sendMesageRouter } = require("./routers/sendMessageRouter");

const { joinTables } = require("./db/query");

const app = express();

app.use(express.urlencoded({ extended: false }));

// static files

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// session store

const sessionStore = new pgSession({
  pool: pool,
  tableName: "session",
});

// express session

app.use(
  expressSession({
    store: sessionStore,
    secret: process.env.SECRET_ENV,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.session());

app.use("/sign-up", inserUserRouter);

app.use("/log-in", logInRouter);

app.use("/log-out", logOutRouter);

app.use("/send-message", sendMesageRouter);

app.get("/", async (req, res) => {
  try {
    const { rows } = await joinTables();

    res.render("index", { user: rows, currentUser: req.user });
  } catch (err) {
    console.error("error happende in app.js:", err);
    return err;
  }
});

app.listen(3000);
