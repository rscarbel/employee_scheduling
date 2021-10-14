const express = require('express');
const router = express.Router();
const Employees = require('../models/employees');
const User = require('../models/user');
const makeSchedule = require('../public/js/makeSchedule');
const isAuthenticated = require('../public/js/isAuthenticated');

router.get('/schedule', isAuthenticated, async (req, res) => {
    Employees.find({companyName: req.session.company}, (err,foundEmployees) => {
        res.render('schedule.ejs', {
            schedule: makeSchedule(foundEmployees),
            fullname: req.session.fullname,
            companyName: req.session.company,
            employees : foundEmployees
        });
    })
});

module.exports = router;