const router = require('express').Router();

router.get('/',(req,res) => {
  console.log(req.session);
    res.render('index.pug');
});
router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
    res.render('login.pug');
  });
  router.get('/register', (req, res) => {
    res.render('register');
  });

module.exports =router;