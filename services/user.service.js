const bcrypt = require('bcrypt');
const userModel = require('../Models/user.model');

exports.createUser = async (userData) => {
    try {
        const existingUser = await userModel.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error(`${userData.email}: User already exists`);
        }
        const userDetails = new userModel(userData);
        const salt = await bcrypt.genSalt(10);
        userDetails.password = await bcrypt.hash(userData.password, salt);
        await userDetails.save();
        return { type: "Success", message: "User added successfully" };
    } catch (error) {
        console.log("error in createUser:", error);
        throw new Error(error.message || 'Registration failed');
    }
};

exports.userDetails = async (email) => {
    try{
           const userRep = await userModel.find({email:email })
           return {
               status: 'Success',
               data: userRep,
           }
       }catch (error){
            console.log(" error ", error)
            throw new Error(error.message || 'Failed to retrieve user details' );
       }
 }

 exports.getAllUsers = async () => {
    try {
        const allUsers = await userModel.find();
        return allUsers;
    } catch (error) {
        console.log(" error ", error);
        throw new Error('Failed to retrieve users');
    } 
}