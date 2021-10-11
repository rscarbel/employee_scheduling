const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');

router.get('/employee/delete', isAuthenticated, async (req, res) => {
    await User.deleteMany({});
    res.redirect('/');
});

router.get('/employeeData', isAuthenticated, (req, res) => {
    res.send(Employee)
});

router.get('/viewEmployees', isAuthenticated, (req, res) => {
  Employee.find({},(err,foundEmployees) => {
    res.render('addEmployee.ejs', {employees: Employee, user: req.session.user})
  })
});

router.post('/addEmployee', isAuthenticated, (req, res) => {
   Employee.create(req.body,(err,employee) => {
     res.redirect('/viewEmployees')
   })
});

function isAuthenticated(req, res, next) {
    if(!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

module.exports = router;