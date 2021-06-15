const router = require('express').Router();
const sequelize =require('../config/connection-sequelize');
const { Users} = require('../models');

router.get('/',(req,res) => {
    res.render('profile',{loggedIn:true});
});

module.exports = router;