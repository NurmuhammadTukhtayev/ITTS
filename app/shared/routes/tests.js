const express = require('express');
const app = express.Router();
const controller = require('../controllers/tests');

// start test
app.get('/', controller.start_test)

// start test post
app.post('/', controller.start_test_post);

// submit test
app.post('/submit-test', controller.check_answer);

// get test questions
app.get('/:id', controller.get_test_questions);

module.exports = app;
