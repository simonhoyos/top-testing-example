require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/db');
const userRouter = require('./src/routes/user');
const taskRouter = require('./src/routes/task');

const port = process.env.PORT || 8000;

const app = express();
db();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
