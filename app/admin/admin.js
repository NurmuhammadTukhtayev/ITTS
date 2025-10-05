const express = require('express')
const auth = require('./middlewares/auth')
const app = express.Router()

app.use('/', require('./routes/sign'));

app.use('/home', [auth, require('./routes/home')]);

app.use('/materials', [auth, require('./routes/materials')]);

module.exports = app;
