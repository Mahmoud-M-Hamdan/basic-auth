'use strict';

const express = require('express');
const { signUp, signIn } = require('../auth/auth');

const router = express.Router();

// request routes and callbacks
router.post('/signup', signUp);
router.post('/signin', signIn);

// require this to server.js
module.exports = router;