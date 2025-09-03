const userModel = require('../Models/user.model');

exports.userList = async () => {
  try {
    const userListRes = await userModel.find();
    return {
      status: 'Success',
      data: userListRes,
    };
  } catch (error) {
    console.log(' error ', error);
    throw new Error('Error! Failed to retrieve user List');
  }
};
