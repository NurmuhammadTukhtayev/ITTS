const express = require('express');
const app = express.Router();
const {query} = require('../../../database/connction/query');

app.get('/', require('../controllers/contact'));

module.exports = app;
