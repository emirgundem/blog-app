const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../User');
const Post = require('../Post');

//Update User
router.put('/update/:id',async(request,response)=>{
    if(request.body.userId === request.params.id){
        if(request.body.password){
            const salt = await bcrypt.genSalt(10);
            request.body.password = await bcrypt.hash(request.body.password,salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(request.params.id,{
                $set: request.body,
            },{new:true});

            response.status(200).json(updateUser);
        } 

        catch (err) {
            response.send(err).status(500);
        }
    }
    else {
        response.status(401).json({message : 'You can update only your account'})
    }

})

//Delete User
router.delete('/delete/:id',async(request,response)=>{
    if(request.body.userId === request.params.id){
        try {
            const user = await User.findById(request.params.id)
            try {
                await Post.deleteMany({username : user.username});
                await User.findByIdAndDelete(request.params.id);
                response.status(200).json("User has been deleted");
            } 
            catch (err) {
                response.json(err).status(500);
            }
        } 
        catch (err) {
            response.json('User not found').status(401);
        }
    }
    
    else {
        response.status(401).json('You can delete only your account');
    }
})





module.exports = router;