const express = require('express')
const app = express.Router()
const controllers = require('../controllers/sign');
const {redirect_to_home} = require('../controllers/generic');

// redirect to tournaments
app.get('/', redirect_to_home);

app.get('/login', controllers.get_sign_in);

app.post('/login', controllers.sign_in);

app.get('/logout', controllers.sign_out);

module.exports = app