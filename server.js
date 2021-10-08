
const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
//Routes
const authRoute = require('./api/models/routes/auth');
app.use('/api/auth',authRoute);

//MongoDb Connection
mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
     console.log('Connection Success');
})


app.listen(port,()=>{
    console.log('Server Running on port : ', port);
})