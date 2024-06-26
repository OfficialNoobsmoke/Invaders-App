const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

module.exports = app;