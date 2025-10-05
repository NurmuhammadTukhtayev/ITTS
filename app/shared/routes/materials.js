const express = require('express')
const app = express.Router()

app.get('/:category', require('../controllers/materials'));

module.exports = app;
