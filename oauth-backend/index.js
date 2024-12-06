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

// app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile); // `profile` contains the user's Google profile information
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user); // Pass the user object (profile) to session storage
});

passport.deserializeUser((user, done) => {
  done(null, user); // Retrieve the user object from session storage
});

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'> Login with google </a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/profile", (req, res) => {
  // Ensure the user is logged in and `req.user` is populated
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.displayName}`);
  } else {
    res.redirect("/");
  }
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});
// app.use("/api/login", login);

app.listen(5000, () => console.log("Server is running on Port 5000"));
