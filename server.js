
const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
//Routes
const authRoute = require('./api/models/routes/auth');
const userRoute = require('./api/models/routes/users');
const postRoute = require('./api/models/routes/posts');
const categoryRoute = require('./api/models/routes/category');

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories',categoryRoute);

//MongoDb Connection
mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
     console.log('Connection Success');
})


app.listen(port,()=>{
    console.log('Server Running on port : ', port);
})