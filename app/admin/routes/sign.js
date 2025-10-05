const express = require('express')
const app = express.Router()

// redirect to tournaments
app.get('/', require('../controllers/admin/get/redirect'))

app.get('/login', require('../controllers/sign/get/in'))

app.post('/login', require('../controllers/sign/post/in'))

app.get('/logout', require('../controllers/sign/get/out'))

module.exports = app