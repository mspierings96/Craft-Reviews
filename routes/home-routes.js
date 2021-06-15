const router = require('express').Router();

router.get('/',(req,res) => {
    res.render('index.pug');
});
router.get('/login', (req, res) => {
    res.render('login');
  });
  router.get('/register', (req, res) => {
    res.render('register');
  });
module.exports =router;