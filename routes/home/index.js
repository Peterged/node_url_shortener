import express from 'express';

const router = express.Router();

// import assert from 'assert';

router.get('/', (req, res, next) => {
  const originRes = res;
  res.render('home', {
    welcomeMessage: 'This is the Landing Page',
  });

  setTimeout(() => {
    console.log('redirected');

    originRes.redirect(301, '/auth/login');
  }, 1000);
  next();
});

// STATUS ERROR CODE HANDLING
router.all('/', (req, res, next) => {
  // 404
  res.status(404).render('errors/404');
  next();
});

module.exports = router;
