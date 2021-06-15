const router = require('express').Router();

router.get('/',(req,res) => {
  console.log(req.session);
    res.render('index.pug');
});
router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/profile');
    return;
  }
    res.render('login');
  });
  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post('/logout',(req,res)=> {
    if(req.session.loggedIn){
      req.session.destroy(() => {
        res.status(204).end();
      })
    }
    else {
      res.status(404).end();
    }
  })
module.exports =router;