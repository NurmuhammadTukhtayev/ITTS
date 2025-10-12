const express = require('express')
const app = express.Router()
const controllers = require('../controllers/tests');
const upload = require('../middlewares/upload');

// debugging middleware
// app.use('/', (req, res, next) => {
//     console.log('Blogs route accessed');
//     console.log(req.method, req.url);
//     console.log(res.locals)
//     next();
// });

// get list of test
app.get('/', controllers.get_tests);

// add new test 
app.post('/', controllers.add_test);

// upload test from a file
app.post('/upload', [upload, controllers.upload_test_file]);

// delete test
app.delete('/delete/:id', controllers.delete_test);

// get test questions
app.get('/:id', controllers.get_test);

// update the test
app.put('/:id', controllers.modify_test);

// add new question
app.post('/:id', controllers.add_question);

// modify a question
app.put('/:id/edit/:question_id', controllers.modify_question);

// delete question
app.delete('/:id/delete/:question_id', controllers.delete_question);

module.exports = app;