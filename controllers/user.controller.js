const userService = require('../services/user.service');

exports.signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  // Your login logic here
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};