const express = require('express');
const app = express.Router();
const controller = require('../controllers/evaluation');

// get blogs
app.get('/', controller.get_posts);

// get blog
app.get('/:blog_id', controller.get_post);

module.exports = app;
