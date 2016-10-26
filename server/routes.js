var path = require('path');
var router = require('express').Router();
var igAuth = require('./controller/authController.js');
var passport = require('passport');
var express = require('express');
var app = require('./server.js');
var util = require('./util/utility.js');
// Authorization routes
router.get('/handleauth', igAuth.handleauth);
router.get('/redirect', igAuth.authUser);
// router.get('/', igAuth.verify);
// Instagram routes

// User routes
router.get('/', util.checkUser, igAuth.directHome);
router.get('/logout', igAuth.logout);


module.exports = router;
