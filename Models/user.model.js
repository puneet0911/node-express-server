const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
      required: true,
      select: false
    },
    date: {
      type: String,
      default: Date,
    },
  });
  
  const User = mongoose.model("User", UserSchema);

  module.exports = User;