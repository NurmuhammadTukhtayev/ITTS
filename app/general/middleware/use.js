const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();

const secret = process.env.SECRET_KEY;

module.exports = [
    express.static('public'),

    // for api
    bodyParser.json(),

    bodyParser.urlencoded({extended:true}),
    // express.json(),

    fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 },
    }),

    methodOverride(function(req, res){
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
        }
    }),

    cookieParser(secret),

    session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        // store path should be out of working directory
        store: new FileStore({ path: require('path').join(__dirname, '../../../../') + './session-store' }),
        cookie: { maxAge: 12*3600000, secure: false, httpOnly: false }
    }),

    cors()
]