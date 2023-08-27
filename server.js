const express = require('express');
const app = express ();
const database = require('./configs/database.config')
database()

const indexRouter = require('./Routes/index')
const postRouter  = require('./Routes/posts')
const userRouter = require('./Routes/users')

app.use(express.json());
app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
module.exports = app;