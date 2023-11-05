const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('home', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
