const express = require('express');
const app = express.Router();

app.get('/', require('../controllers/contact'));

module.exports = app;
