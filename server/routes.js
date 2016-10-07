var path = require('path');
var router = require('express').Router();
var igAuth = require('./auth/instagramAuth.js');


// Authorization routes
router.get('/auth', igAuth.igAuthorization);
router.post('/verified', igAuth.handleauth);
// Instagram routes

// User routes

module.exports = router;
