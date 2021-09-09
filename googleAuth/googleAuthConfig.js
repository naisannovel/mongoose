const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GoogleAuth } = require('../models/googleAuthModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4001/auth/google/redirect'
},     async (accessToken, refreshToken, profile, cb) => {
    // here we will save data in DB
    let user = await GoogleAuthUser.findOne({
        googleId: profile.id,
        email: profile._json.email
    })
    if(user){
        const token = user.generateJWT()
        const response = {
            user: _.pick(user,['email','_id']),
            token: token
        }
        cb(null,response)
    }else{
        user = new GoogleAuthUser({
            googleId: profile.id,
            email: profile._json.email
        })
        await user.save()
        const token = user.generateJWT()
        const response = {
            user: _.pick(user,['email','_id']),
            token: token
        }
        cb(null,response)
    }
}))
