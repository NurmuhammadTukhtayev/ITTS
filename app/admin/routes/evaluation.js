const express = require('express')
const app = express.Router()
const controllers = require('../controllers/evaluation');
const upload = require('../middlewares/upload');

// debugging middleware
// app.use('/', (req, res, next) => {
//     console.log('Blogs route accessed');
//     console.log(req.method, req.url);
//     next();
// });

// get list of blogs
app.get('/', controllers.get_evaluation_posts);

// get create/edit blog page
app.get('/create', controllers.get_create_posts);

// create a blog
app.post('/create', [upload, controllers.create_blog]);

// get edit blog
app.get('/edit/:id', controllers.get_edit_blog);

// edit a blog
app.put('/edit/:id', [upload, controllers.edit_blog]);

// delete a blog
app.delete('/delete/:id', controllers.delete_blog);

module.exports = app;