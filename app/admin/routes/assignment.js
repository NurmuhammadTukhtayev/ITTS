const express = require('express')
const app = express.Router()
const controllers = require('../controllers/assignment');
const upload = require('../middlewares/upload');

// get list of assignments
app.get('/', controllers.get_assignment);

// add new assignmen
app.post('/', [upload, controllers.add_assignment]);

// modifiy existing assignment
app.put('/:id', [upload, controllers.update_assignment]);

// delete assignment
app.delete('/:id', controllers.delete_assignment);

module.exports = app;