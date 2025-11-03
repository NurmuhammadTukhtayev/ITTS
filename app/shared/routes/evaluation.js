const express = require('express');
const app = express.Router();
const controller = require('../controllers/evaluation');

// get tests evaluation
app.get('/test', controller.get_tests);

// get test evaluation by id
app.get('/test/:test_id', controller.get_test_by_id);

// get blogs
app.get('/assignment', controller.get_posts);

// get blog
app.get('/assignment/:blog_id', controller.get_post);

module.exports = app;
