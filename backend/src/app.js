const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
db();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use(userRouter);
app.use('/tasks', taskRouter);

module.exports = app;
