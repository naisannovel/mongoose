const googleAuthRouter = require('./googleAuthRouter');


module.exports = (app)=>{
    app.use('/auth',googleAuthRouter)
}