require('dotenv').config()
const express = require('express');
const cors = require("cors");
const http = require("http");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userModel = require("./Models/user.model");

const indexRouter = require('./Routes/index')
const postRouter  = require('./Routes/posts')
const userRouter = require('./Routes/users');

const app = express ();
const server = http.createServer(app);
const database = require('./configs/database.config')
database()
app.use(cors());


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  console.log("New client connected with id:", socket.id);
  // --- Chat Room Logic Start ---
  // Join a chat room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.to(room).emit("message", { user: "system", text: `A user joined room: ${room}` });
  });

  // Leave a chat room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    socket.to(room).emit("message", { user: "system", text: `A user left room: ${room}` });
  });

  // Send a message to a room
  socket.on("chatMessage", ({ room, user, message }) => {
    io.to(room).emit("message", { user, text: message });
  });
  // --- Chat Room Logic End ---

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    console.log(`Incoming call from ${data.from}`);
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log(`Answering call from ${data.from}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

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
        console.log(" error :-", err)
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

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

console.log(" Working ")

app.use(express.json());
app.use("/user", userRouter);
app.use("/", ensureAuthenticated, indexRouter);
app.use("/post", ensureAuthenticated, postRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

function ensureAuthenticated(req, res, next) {
    return next();
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  }

module.exports = app;