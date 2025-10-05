const express = require('express')
const app = express.Router()

app.get('/:category', require('../controllers/media'));

module.exports = app;
