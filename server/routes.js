var path = require('path');
var router = require('express').Router();
var igAuth = require('./auth/instagramAuth.js');


// Authorization routes
router.get('/authhandle', igAuth.verifyUser);
router.get('/', igAuth.auth);
// Instagram routes

// User routes

module.exports = router;
