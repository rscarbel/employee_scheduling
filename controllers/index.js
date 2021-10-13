const express = require('express');
const router = express.Router();
const Employees = require('../models/employees');
const User = require('../models/user');
const makeSchedule = require('../public/js/makeSchedule')
const isAuthenticated = require('../public/js/isAuthenticated');

router.get('/schedule', isAuthenticated, async (req, res) => {
    const currentUser = await User.findById(req.session.user)
    Employees.find({}, (err,foundEmployees) => {
        res.render('schedule.ejs', {
            schedule: makeSchedule(foundEmployees),
            currentUser: currentUser,
            employees : foundEmployees
        });
    })
});

module.exports = router;