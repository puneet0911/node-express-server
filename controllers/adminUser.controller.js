const userAdminService = require('../services/adminUser.service');

exports.getUserList = async (req, res) => {
  try {
    const user = await userAdminService.userList();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
