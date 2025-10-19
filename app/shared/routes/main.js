const express = require('express')
const app = express.Router()

// main page
app.get('/', require('../controllers/main'));

// download docs
app.get('/download/:id', require('../controllers/document_download'));

module.exports = app;
