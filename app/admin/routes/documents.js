const express = require('express')
const app = express.Router()
const controllers = require('../controllers/documents');
const upload = require('../middlewares/upload');

// get list of documents
app.get('/', controllers.get_documents);

// add document
app.post('/', [upload, controllers.add_document]);

// udpate docs
app.put('/:id', [upload, controllers.update_document]);

// delete docs
app.delete('/:id', controllers.delete_document);

module.exports = app;