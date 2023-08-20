const mongoose = require("mongoose");
// const mongoose = require("../configs/database.config");

const PostSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [{
        like : {type:Boolean, default:false},
        userID : {type: String}
      }],
    },
    comments: {
      type: Array,
      default: [{
        comment : { type : String},
        userID : { type : String}
      }],
    },
    date: {
      type: String,
      default: Date,
    },
  });
  
  const Post = mongoose.model("Post", PostSchema);

  module.exports = Post;