const express = require('express');
const router = express.Router();

const Post = require('../Post');

//CREATE POST
router.post('/new',async(request,response)=>{
    const newPost = new Post((request.body));
    try {
        const savedPost = await newPost.save();
        response.status(200).json(savedPost);
    } catch (err) {
        response.status(500).json(err)
    }
})

//GET ALL POST
router.get('/search/all',async(request,response)=>{
    try {
        const getAllPost = await Post.find();
        response.status(200).json(getAllPost);
    } catch (error) {
        response.status(500).json(err);
    }
})


//GET POST WITH ID
router.get('/search/:id',async(request,response)=>{
    try {
        const getPost = await Post.findById(request.params.id);
        const {username,...others} = getPost._doc;
        response.status(200).json(others);
    } catch (err) {
        response.status(500).json(err);
    }
})



//UPDATE POST
router.put('/update/:id',async(request,response)=>{
    try{
        const post = await Post.findById(request.params.id);
        if(post.username === request.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(request.params.id,
                    {
                        $set: request.body,
                    },
                    {new:true}
                )
                response.status(200).json(updatedPost);
            }
            catch(err){
                response.status(500).json(err)
            }
        } 
        else{
            response.status(401).json("You can update only your account");
        }
    }
    catch(err){
        response.status(500).json(err)
    } 
})



//DELETE POST
router.delete('/delete/:id',async(request,response)=>{
    try {
        const post = await Post.findById(request.params.id);
        if(post.username === request.body.username){
            try {
                const deletePost = await Post.findByIdAndDelete(request.params.id);
                response.status(200).json("Your post has been deleted");
            } catch (err) {
                response.status(500).json(err)
            }
        }
        else {
            response.status(401).json("You can only deleted your post");
        } 
    } catch (err) {
        response.status(500).json(err)
    }
})

//GET POST
router.get('/"',async(request,response)=>{
    try {
        const getPost = await Post.find()
        response.status(200).json(getPost);
    } 
    catch (err) {
        response.status(500).json(err);
    }
})















module.exports = router;