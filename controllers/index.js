const express = require('express');
const router = express.Router();
const isAuthenticated = require('../public/js/isAuthenticated');

router.get('/schedule', isAuthenticated, (req, res) => {
    res.render('schedule.ejs', { user: req.session.user });
});

module.exports = router;