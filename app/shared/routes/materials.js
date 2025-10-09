const express = require('express')
const app = express.Router()

app.get('/:category', require('../controllers/materials'));

app.get('/download/:id', require('../controllers/materials_download'));

module.exports = app;
