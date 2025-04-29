require("dotenv").config();
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(expressSession);

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

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000);
