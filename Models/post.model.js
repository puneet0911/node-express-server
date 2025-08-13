const mongoose = require("mongoose");
// const mongoose = require("../configs/database.config");

const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    createdAt: {
      type: String,
      default: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    updatedDate: {
      type: Date,
      required: false,
    },
  });
  
  const Post = mongoose.model("Post", PostSchema);

  module.exports = Post;