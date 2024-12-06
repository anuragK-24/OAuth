require("dotenv").config();

const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const login = require("./routers/login");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/api/login", login);

app.listen(5000, () => console.log("app is running on the server 5000"));
