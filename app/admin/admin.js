const express = require('express')
const auth = require('./middlewares/auth')
const app = express.Router()

// sign in
app.use('/', require('./routes/sign'));

// authentication
app.use(auth);

// home page | Profile
app.use('/home', require('./routes/home'));

// manage learning materilas
app.use('/materials', require('./routes/materials'));

// manage media 
app.use('/media', require('./routes/media'));

// blog management
app.use('/blogs', require('./routes/blogs'));

// 404
app.use(require('./controllers/admin/get/pnf'))

module.exports = app;
