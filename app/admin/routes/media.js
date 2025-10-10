const express = require('express')
const app = express.Router()
const controllers = require('../controllers/media');
const upload = require('../middlewares/upload');

// debugging middleware
// app.use('/', (req, res, next) => {
//     console.log('Media route accessed');
//     console.log(req.method, req.url);
//     next();
// });

// get list of media
app.get('/', controllers.get_media);

// upload new media
app.post('/', [upload, controllers.post_media]);

// get edit media page
app.get('/edit/:id', controllers.get_edit_media);

// edit media
app.post('/edit/:id', [upload, controllers.update_media]);

// delete media
app.delete('/delete/:id', controllers.delete_media);


module.exports = app;