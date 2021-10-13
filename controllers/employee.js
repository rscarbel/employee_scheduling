const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const isAuthenticated = require('../public/js/isAuthenticated');

router.get('/employee/delete/:id', isAuthenticated, (req, res) => {
    Employee.deleteOne({_id: req.params.id},(err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.redirect('/viewEmployees')
      }
    });
});

router.get('/employeeData', isAuthenticated, (req, res) => {
    res.send(Employee)
});

router.get('/viewEmployees', isAuthenticated, (req, res) => {
  Employee.find({},(err,foundEmployees) => {
    res.render('viewEmployees.ejs', {employees: foundEmployees, user: req.session.user})
  })
});

router.get('/addEmployee', isAuthenticated, (req,res) => {
  res.render('addEmployee.ejs')
})

router.post('/addEmployee', isAuthenticated, (req, res) => {
   Employee.create(req.body,(err,employee) => {
     res.redirect('/viewEmployees')
   })
});

router.post('/employee/edit/:id', isAuthenticated, (req,res) => {
  const updatedEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }
  };
  Reflect.ownKeys(req.body).forEach(e => {
    if (updatedEmployee.availability[e] === false) {
      updatedEmployee.availability[e] = req.body[e];
    }
  })
  Employee.findByIdAndUpdate(req.params.id, updatedEmployee, (err, employee) => {
    res.redirect('/viewEmployees')
  })
})

module.exports = router;