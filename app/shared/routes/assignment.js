const express = require('express')
const app = express.Router()
const controller = require('../controllers/assignment');

// get assignment
app.get('/', controller.get_assignment);

// dowload assignment
app.get('/:id', controller.download_assignment);


module.exports = app;
