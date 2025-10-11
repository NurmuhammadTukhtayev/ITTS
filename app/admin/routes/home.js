const express = require('express')
const app = express.Router()
const upload = require('../middlewares/upload');
const controller = require('../controllers/profile');

// debugging middleware
// app.use('/', (req, res, next) => {
//     console.log('Home route accessed');
//     console.log(req.method, req.url);
//     next();
// });

// get profile info
app.get('/', controller.get_profile);

// change profile info
app.post('/', [upload, controller.change_profile]);

module.exports = app;
