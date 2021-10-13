const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const isAuthenticated = require('../public/js/isAuthenticated');

router.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {

        if(!foundUser) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        req.session.user = foundUser._id;

        res.redirect('/schedule')
    });
});
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, user) => {
      req.session.user = user._id
      res.redirect('/schedule');
  });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


router.get('/schedule', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        res.render('schedule.ejs', { user });
    });
});

module.exports = router;