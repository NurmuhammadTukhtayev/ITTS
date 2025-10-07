const express = require('express')
const app = express.Router()
const controllers = require('../controllers/materials');
const upload = require('../middlewares/upload');

// get learning material menu
app.get('/', controllers.material_menu);

// add new category to menu
app.post('/', controllers.material_menu_post);

// update category in menu
app.put('/:id', controllers.material_menu_put);

// delete category from menu
app.delete('/:id', controllers.material_menu_delete);

// get learning materials by category
app.get('/:id', controllers.materials_by_category);

// add new item
app.post('/:id/items', [upload, controllers.material_post])

module.exports = app;