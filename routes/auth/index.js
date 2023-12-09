const express = require('express');
const router = express.Router();

// LOGIN
router.get('/login', (req, res) => {
    res.status(200).render('auth/login', {
        formTitle: 'LOGIN FO',
        formData: req.query || ''
    });

    // Query is from ?username=wow
    // That is query


    // Params is from URL/12312
    // 12312 is the param (you can give it a name with :NAME_HERE)

    // Body is from the POST Request
    console.log(req.query)
})

router.post('/login', (req, res) => {
    res.render('auth/login')
})

// REGISTER
router.get('/register', (req, res) => {
    res.render('auth/register', {
        formTitle: 'REGISTER FORM'
    });
})

router.post('/register', (req, res) => {
    res.status(200).render('auth/register');
})


module.exports = router;
