'use strict';

require('dotenv').config();
const mongodb = process.env.MONGODB_URI || 'Mongodb';

const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(mongodb, options);

require('./src/app.js').start(process.env.PORT || 5000);