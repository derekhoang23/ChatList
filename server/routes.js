var path = require('path');
var router = require('express').Router();
var igAuth = require('./auth/instagramAuth.js');
var passport = require('passport');

// Authorization routes
router.get('/handleauth', igAuth.handleauth);
router.get('/', igAuth.authUser);
// router.get('/', igAuth.verify);
// Instagram routes

// User routes

module.exports = router;
