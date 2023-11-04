require('dotenv').config()
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userModel = require("./Models/user.model");

const indexRouter = require('./Routes/index')
const postRouter  = require('./Routes/posts')
const userRouter = require('./Routes/users');

const app = express ();
const database = require('./configs/database.config')
database()

console.log(" process.env.SESSION_SECRET ", process.env.SESSION_SECRET)
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
console.log(" process.env.SESSION_SECRET ", process.env.SESSION_SECRET)

// Configure Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      console.log("email ", email)
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        const isPasswordValid = await userModel.isValidPassword(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

console.log(" Working ")

app.use(express.json());
app.use("/user", userRouter);
app.use("/", ensureAuthenticated, indexRouter);
app.use("/post", ensureAuthenticated, postRouter);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  }

module.exports = app;