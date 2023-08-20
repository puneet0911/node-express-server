var express = require('express');
var router = express.Router();
const postModel = require("../Models/post.model");

/* GET home page. */
router.get('/all', async function(req, res, next) {
    try{
        const allPosts = await postModel.find()
        res.status(200).send({
            status: 'Success',
            data: allPosts,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

router.get('/add', async function(req, res, next) {
    try{
        const allPosts = await postModel.find()
        res.status(200).send({
            status: 'Success',
            data: allPosts,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

module.exports = router;