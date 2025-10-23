const express = require('express');

const app = express.Router()

// main home
app.use('/', require('./routes/main'));

// learning materials
app.use('/materials', require('./routes/materials'));

// media 
app.use('/media', require('./routes/media'));

// blog
app.use('/blog', require('./routes/blogs'));

// contact
// app.use('/contact', require('./routes/contact'));

// test 
app.use('/test', require('./routes/tests'));

// about course
app.use('/about', require('./routes/about'));

// assignment
app.use('/assignment', require('./routes/assignment'));

// evaluation
app.use('/evaluation', require('./routes/evaluation'));

module.exports = app;
