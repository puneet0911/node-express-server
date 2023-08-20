const express = require('express');
const app = express ();
const indexRouter = require('./Routes/index')
const database = require('./configs/database.config')
app.use(express.json());
app.use("/", indexRouter);
module.exports = app;