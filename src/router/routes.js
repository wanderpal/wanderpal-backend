'use strict';

const express = require('express');
const router = express.Router();

//============================================================
// Routes
//============================================================

router.get('/', (request, response) => {
  response.send('Home')
});

module.exports = router;