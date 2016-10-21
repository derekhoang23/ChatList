var path = require('path');
var router = require('express').Router();
var igAuth = require('./auth/instagramAuth.js');
var passport = require('passport');
var express = require('express');
var app = require('./server.js');
// Authorization routes
router.get('/handleauth', igAuth.handleauth);
router.get('/redirect', igAuth.authUser);
// router.get('/', igAuth.verify);
// Instagram routes

// User routes
router.get('/', function(req, res) {
  console.log('ses', req.session);
  if (req.session.token) {
    console.log('esist');
    res.sendFile(path.join(__dirname, '../client/index.html'));
  } else {
    res.redirect('/redirect');
  }
});


module.exports = router;
