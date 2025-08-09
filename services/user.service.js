const passport = require('passport');
const userModel = require('../Models/user.model');

exports.createUser = async (userData) => {
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
};

exports.loginUser = async (email, password) => {
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
}