const express = require('express')
const app = express.Router()

// using middlewares
app.use(require('./general/middleware/use'));

// generic request handle middleware
app.use(require('./general/middleware/base_context'));

// shared 
app.use('/', require('./shared/shared'));

// admin
app.use('/@admin', require('./admin/admin'))

// page not found
app.use(require('./shared/controllers/pnf'));

// Global error handler
app.use(require('./general/middleware/error_handler'));

module.exports = app;