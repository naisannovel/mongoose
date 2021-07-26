const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect(process.env.MONGODB_SERVER_LOCAL,{     // mongodb://localhost:27017/users
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>console.log('mongoDB connected successfully'))
.catch(err=>console.log('mongoDB connection failed'));

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});