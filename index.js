const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash-message');

// VIEW ENGINE SET
app.set('view engine', 'ejs');


// Use (for easier work) (you understand :) )
// This line of code acts like a namespace / module
// You can access it by just using res.render('whatever path to file is in the public folder')
// Without needing to go back folders
app.set('views', path.join(__dirname, 'views'));


// POST SET
app.use(bodyParser.urlencoded({
    extended: true
}))

// Needs Session
app.use(
    flash.default({
        sessionKeyName: 'express-flash-message',
        // below are optional property you can pass in to track
        onAddFlash: (type, message) => { },
        onConsumeFlash: (type, messages) => { },
    })
);


// Port
const port = process.env.POST || 4040;


// Import Controllers
const users = require('./routes/users');
const auth = require('./routes/auth')
const home = require('./routes/home')

// STATIC FILES (Images, etc)
// app.use('/static', express.static(path.join(__dirname, 'public')))


// Set Controllers
app.use('/users', users);
app.use('/auth', auth);
app.use('/', home);

app.all('/', (req, res, next) => {
    // 404
    res.status(404).render('errors/404');
})


// Starting App
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
