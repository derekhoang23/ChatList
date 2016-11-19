var path = require('path');
var router = require('express').Router();
var igAuth = require('./controller/authController.js');
var igFeed = require('./controller/instagramController.js');
var search = require('/controller/searchFriend.js');
var passport = require('passport');
var express = require('express');
var app = require('./server.js');
var util = require('./util/utility.js');
// Authorization routes
router.get('/handleauth', igAuth.handleauth);
router.get('/redirect', igAuth.authUser);
// router.get('/', igAuth.verify);
// Instagram routes
router.get('/getPics', util.checkUser, igFeed.getPics);
router.get('/userList', util.checkUser, igFeed.retrieveUsers);

// User routes
router.get('/', util.checkUser, igAuth.directHome);
router.get('/logout', igAuth.logout);
router.post('/search', util.checkUser, search.searchFriend);


module.exports = router;
