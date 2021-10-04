
const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


app.get('/homepage',(request,response)=>{
    
})



//MongoDb Connection
mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
     console.log('Connection Success');
     
})


app.listen(port,()=>{
    console.log('Server Running on port : ', port);
})