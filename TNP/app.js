const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// Configure body-parser and express-session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (styles)
app.use(express.static(path.join(__dirname, 'public')));

// Include the routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
