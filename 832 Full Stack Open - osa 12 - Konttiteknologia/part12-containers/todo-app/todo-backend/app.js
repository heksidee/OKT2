const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

const mongoUrl = process.env.MONGO_URL;
console.log('Connecting to MongoDB:', mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
