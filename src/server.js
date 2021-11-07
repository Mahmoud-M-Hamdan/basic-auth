'use strict';
require('dotenv').config();

// 1st level packages -> we did not install anything
// 3rd party packages
const express = require('express');
// local modules
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middlewares/logger');
const router= require('./routes/users.route');
const app = express();

const PORT=process.env.PORT

// Global Middlewares
app.use(express.json()); // access the body
app.use(express.urlencoded({ extended: true }));
// app.use(cors()); install the package
app.use(logger);
app.use(router);


function start(port) {
    app.listen(port, ()=> console.log(`Running on Port ${port}`))
}

app.get('/',(req,res)=>{
    console.log("heey")
    res.send("مساء البطاطا")
})

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    app: app,
    start: start
}