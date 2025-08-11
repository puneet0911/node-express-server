const passport = require('passport');
const userService = require('../services/user.service');

exports.signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  // Your login logic here
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userService.userDetails(req.params.email);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}