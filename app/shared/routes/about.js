const express = require('express');
const app = express.Router();
const controller = require('../controllers/about');

app.get('/', controller.get_about);


module.exports = app;
