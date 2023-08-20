const express = require('express');
const app = express ();
const database = require('./configs/database.config')
database()

const indexRouter = require('./Routes/index')
const postRouter = require('./Routes/posts')
app.use(express.json());
app.use("/", indexRouter);
app.use("/post", postRouter);
module.exports = app;