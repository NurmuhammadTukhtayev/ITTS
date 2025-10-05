const express = require('express')
const app = express.Router()
const upload = require('../middlewares/upload')

// get tournament list
app.get('/', require('../controllers/admin/get/home'));

module.exports = app