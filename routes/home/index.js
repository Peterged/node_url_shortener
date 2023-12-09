const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        welcomeMessage: 'This is the Landing Page'
    });
})

// STATUS ERROR CODE HANDLING
router.all('/', (req, res, next) => {
    // 404
    res.status(404).render('errors/404');
})


module.exports = router;
