var express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
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

/* Get specific user. */
router.post('/signup', async function(req, res) {
    try{
        let getUserDetails = await userModel.findOne({email:req.body.email});
        if (!getUserDetails) {
            let userDetails = new userModel(req.body);
            const salt = await bcrypt.genSalt(10);
            userDetails.password = await bcrypt.hash(req.body.password, salt);
            await userDetails.save().then(() => {
               return res.json({
                    type:"Success",
                    massage:'User added successfully'
                });
            
            }).catch((err)=>{
                console.log(" err ", err)
               return res.json({
                    status: 'Error',
                    data: err,
                });
                throw err
            });
           
        } else {
            res.json({
                    status: 'Error',
                    data: req.body.email + ": User already exist",
                });
        }
    } catch (error){
        console.log(" error ", error)
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login route
router.post('/login',(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
    
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
    
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json({ message: 'Login successful' });
        });
      })(req, res, next);
});

  
module.exports = router;