const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);
  res.render('homepage',{
      id:1,
      user:{
          username:'test_user'
      }
  })
});

router.get('/login',(req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;