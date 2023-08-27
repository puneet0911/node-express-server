var express = require('express');
var router = express.Router();
const userModel = require("../Models/user.model");

/* GET all Users. */
router.get('/all', async function(req, res, next) {
    try{
        const allUsers = await userModel.find()
        res.status(200).send({
            status: 'Success',
            data: allUsers,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

/* Get specific user. */
router.get('/:email', async function(req, res, next) {
    try{
        const userRep = await userModel.find({email:req.params.email })
        res.status(200).send({
            status: 'Success',
            data: userRep,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

module.exports = router;