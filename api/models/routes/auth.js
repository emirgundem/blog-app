const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../User');

//REGISTER
router.post('/register',async(request,response)=>{
    try {       
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password,salt);
        const newUser = new User({
            username : request.body.username,
            email : request.body.email,
            password : hashPassword,
        })
        const user = await newUser.save();
        response.status(200).json(user);
        
    } catch (err) {
        response.status(500).json(err);
    }
    
})

//Login
router.get('/login',async(request,response)=>{
    try {
        const user = await  User.findOne({email : request.body.email})
        if(!user) 
        return response.send({message : 'Email is not found'}).status(400);
     
        //Password is Correct
        const validPass = await bcrypt.compare(request.body.password,user.password);
        if(!validPass) return response.status(400).send({message : 'Invalid Password'})
        const {password,...others} = user._doc;
        response.send(others)
    } catch (err) {
        response.json(err).status(500);
    }
})





module.exports = router;