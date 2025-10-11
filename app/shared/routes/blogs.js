const express = require('express');
const app = express.Router();
const controller = require('../controllers/blogs');

// get blogs
app.get('/', controller.get_blogs);

// get blog
app.get('/:blog_id', controller.get_blog);

module.exports = app;
