const express = require('express');
const router = express.Router();

const Category = require('../Category');


//NEW CATEGORY
router.post('/new',async(request,response)=>{
    const newCategory = new Category(request.body);
    try {
        const saveCategory = await newCategory.save();
        response.status(200).json(saveCategory);
    } catch (err) {
        response.status(500).json(err)
    }
})

//GET CATEGORY
router.get('/all',async(request,response)=>{
    try {
        const getCategories = await Category.find();
        response.status(200).json(getCategories);
    } catch (error) {
        response.status(500).json(err);
    }
})








module.exports = router;
