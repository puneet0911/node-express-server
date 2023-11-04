const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: Date,
    },
  });

  userSchema.statics.isValidPassword = async function (password, dbPassword) {
    console.log(" dbPassword ", dbPassword)
    console.log(" this.password ", password)
    try {
      return await bcrypt.compare(password, dbPassword);
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = mongoose.model('User', userSchema);