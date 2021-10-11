const express = require('express');
const router = express.Router();

router.get('/schedule', (req, res) => {
    res.render('schedule.ejs', { user: req.session.user });
});

module.exports = router;