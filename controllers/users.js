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
            return res.render('login.ejs', {error: 'Invalid username or password'});
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid username or password'});
        }
        req.session.company = foundUser.companyName;
      req.session.fullname = `${foundUser.firstName} ${foundUser.lastName}`
        req.session.user = foundUser._id;

        res.redirect('/schedule')
    });
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs', {error: null});
});

router.post('/signup', (req, res) => {
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  User.create(req.body, (err, user) => {
    if (err) {
      let message = '';
      //this is a switch so that I can handle more errors as the user model increases in complexity
      switch (err.code) {
        case 11000:
          message += 'The username and email must be unique.\n';
          break;
        default:
          message = 'There was an error creating your account.'
      }

      res.render('signup.ejs',{error: message})
    } else {
      req.session.company = user.companyName;
      req.session.fullname = `${user.firstName} ${user.lastName}`
      req.session.user = user._id;
      res.redirect('/schedule');
    }
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