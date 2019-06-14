'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

<<<<<<< HEAD
const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
=======
// const errorHandler = require('./middleware/500.js');
// const notFound = require('./middleware/404.js');
>>>>>>> cb3e0bd9d1f9f454bce2ad6f794623396eb96ba8
const authRouter = require('./auth/router.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));
app.use(authRouter);

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server up on ${port}.`);
      });
    } else {
      console.log('Server is already running.');
    }
  }
};
