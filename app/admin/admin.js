const express = require('express')
const auth = require('./middlewares/auth')
const app = express.Router()

app.use('/', require('./routes/sign'));

app.use('/home', [auth, require('./routes/home')]);

app.use('/materials', [auth, require('./routes/materials')]);

app.use('/media', [auth, require('./routes/media')]);

app.use(require('./controllers/admin/get/pnf'))

module.exports = app;
