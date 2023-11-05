const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'myapp',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      res.redirect('/login');
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        res.redirect('/login');
      } else {
        req.session.user = username;
        res.redirect('/');
      }
    });
  });
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
