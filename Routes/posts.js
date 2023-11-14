var express = require('express');
var router = express.Router();
const postModel = require("../Models/post.model");

/* GET all posts. */
router.get('/all', async function(req, res) {
    try{
        const allPosts = await postModel.find({user:req.session.passport.user._id})
        res.status(200).send({
            status: 'Success',
            data: allPosts,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

/* POST post. */
router.post('/add', async function(req, res) {
    try{
        let postAdd = new postModel({title:req.body.title,content:req.body.content, user:req.session.passport.user._id});
        await postAdd.save()
        return res.json({
            type:"Success",
            massage:'Post added successfully'
        });
    }catch (error){
        console.log(" error ", error)
        return res.json({
            type:"error",
            massage:'Error! Post added'
        });
    }
});



/* Get post. */
router.get('/get/:postId', async function(req, res) {
    try{
        let getPostDetails = await postModel.findOne({_id:req.params.postId})
        return res.json({
            type:"Success",
            data: getPostDetails,
        });
    }catch (error){
        console.log(" error ", error)
        return res.json({
            type:"error",
            massage:'Error! Post added'
        });
    }
});

/* Update post. */
router.put('/update/:postId', async function(req, res) {
    try{
        await postModel.findByIdAndUpdate(req.params.postId, { title:req.body.title,content:req.body.content });
            return res.json({
                type:"Success",
                massage:'Post updated successfully'
            }); 
    }catch (error){
        console.log(" error ", error)
        return res.json({
            type:"error",
            massage:'Error! Post added'
        });
    }
});

module.exports = router;    