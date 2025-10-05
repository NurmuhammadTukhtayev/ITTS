const express = require('express')
const app = express.Router()

// using middlewares
app.use(require('./general/middleware/use'));

// shared 
app.use('/', require('./shared/shared'));

// admin
app.use('/@admin', require('./admin/admin'))

// page not found
app.use(require('./general/controllers/pnf'));

module.exports = app;