'use strict';

import mongoose from 'mongoose';
import * as app from './src/app';

require('dotenv').config();
const mongodb = process.env.MONGODB_URI || 'Mongodb';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(mongodb, options);

app.start(process.env.PORT || 5000);