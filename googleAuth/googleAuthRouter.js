const router = require('express').Router();
const passport = require('passport');
require('./googleAuthConfig');

// google auth router
router.route('/google')
.get(passport.authenticate('google',{scope:['profile','email']}))

router.route('/google/redirect')
.get(passport.authenticate('google',{session:false}),(req,res)=>{
    res.send(req.user)
})

module.exports = router;