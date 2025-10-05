const express = require('express')
const app = express.Router()

app.get('/', require('../controllers/main'));

module.exports = app;
