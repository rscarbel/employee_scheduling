const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

/*
1) Stub up a basic project boilerplate
2) Install the bcrypt library
3) Define the authentication workflow
   3.1) Define a signup route/controller to send the user to a registration form
   3.2) Allow the user to fill out the form and submit it
   3.3) Use bcrypt to hash the user plain text password from req.body
   3.4) Save the user data to the data along with the hashed version of their password
   3.5) Redirect the user to the login page and make them login or auto log them in and send them to a dashboard
To Login
1) Send the user to a login page
2) User fills out form with login credentials
3) User submits the form as a POST request to the server
    3.1) First, we check to see if the user exists in the database by finding the user by their username
    3.2) If the user does not exist, we need to let them know - "Invalid Credentials"
    3.3) If the user is found, we need to compare the plain text password submitted in the form to the
         hashed password
    4.3) If the password is not a match, we need to let the user know - "Invalid Credentials"
    4.4) If the password is correct we create a session on the server
         by storing the users ObjectId in session storage
To Logout
1) User clicks a logout button
2) We receive that request on the server side
3) req.session.destroy()
*/

router.get('/users/delete', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/');
});

// present user with login page
router.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});

// handle form submission to login
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

        res.redirect('/dashboard')
    });
});

// present user with signup page
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
   // 0) Perform a db lookup to determine if username exist
  // 1) Hash the password
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  // 2) Save the user data to the database with the hashed version of the password
  User.create(req.body, (err, user) => {
      // 4) login with a session and then send the user a dashboard
      req.session.user = user._id
      res.redirect('/dashboard');
  });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Protected Route
router.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        res.render('dashboard.ejs', { user });
    });
});

// Utility Functions

// Auth middleware
function isAuthenticated(req, res, next) {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    next(); // user is authenticated, keep moving on to the next step
}


// INDUCES

module.exports = router;