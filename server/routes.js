var path = require('path');
var router = require('express').Router();
var igAuth = require('./auth/instagramAuth.js');


// Authorization routes
router.get('/handleauth', igAuth.verifyUser);
router.post('/login', igAuth.auth);
// Instagram routes

// User routes

module.exports = router;
