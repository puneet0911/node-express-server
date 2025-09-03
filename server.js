require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userModel = require('./src/Models/user.model');
const { getDbStatus } = require('./dbHealth');
const logger = require('./src/logger');

const indexRouter = require('./src/routes/index');
const postRouter = require('./src/routes/posts');
const userRouter = require('./src/routes/users');
const adminUserRouter = require('./src/routes/adminUsers');

const app = express();
const server = http.createServer(app);
const database = require('./configs/database.config');
database();
app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Use the separate socket module
require('./socket')(io);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: 'lax' }, // secure: false for HTTP
  })
);
app.use(passport.initialize());
app.use(passport.session());
logger.info('SESSION_SECRET ', process.env.SESSION_SECRET);

// Configure Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      console.log('email ', email);
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        const isPasswordValid = await userModel.isValidPassword(
          password,
          user.password
        );

        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (err) {
        console.log(' error :-', err);
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use('/user', userRouter);
app.use('/', ensureAuthenticated, indexRouter);
app.use('/post', ensureAuthenticated, postRouter);
app.use('/admin', requireRole('admin'), adminUserRouter);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date(),
    db: getDbStatus(), // Include DB status in the health check
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: insufficient privileges' });
  };
}

app.use((err, res) => {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;
