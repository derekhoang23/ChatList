var path = require('path');
var router = require('express').Router();
var igAuth = require('./controller/authController.js');
var igFeed = require('./controller/instagramController.js');
var search = require('./controller/searchFriend.js');
var passport = require('passport');
var express = require('express');
var app = require('./server.js');
var util = require('./util/utility.js');
var message = require('./controller/messageController.js');
// Authorization routes
router.get('/handleauth', igAuth.handleauth);
router.get('/redirect', igAuth.authUser);
router.get('/', util.checkUser, igAuth.directHome);

// Instagram routes
router.get('/getPics', util.checkUser, igFeed.getPics);
router.get('/userList', util.checkUser, igFeed.retrieveUsers);

// User routes
router.get('/userInfo', util.checkUser, igAuth.userInfo);
router.get('/logout', igAuth.logout);
router.post('/search', util.checkUser, search);

// Message routes
router.post('/postMessages', util.checkUser, message);


module.exports = router;
