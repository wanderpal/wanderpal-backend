'use strict';

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

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
