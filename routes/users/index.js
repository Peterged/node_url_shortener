import express from 'express';
const router = express.Router();


router.get('/profile', (req, res) => {
    res.render('users/profile');
})

module.exports = router;
