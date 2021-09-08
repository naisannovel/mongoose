const router = require('express').Router()
const passport = require('passport');

// localhost:3001/auth/google - main uri
router.route('/').get(passport.authenticate('google', { scope: ['profile'] })) // scope => which items we want

// localhost:3001/auth/google/redirect - redirect uri
router.route('/redirect').get(passport.authenticate('google', { session: false }),(req,res)=>{
    res.send(req.user)
})

module.exports = router;