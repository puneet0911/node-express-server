const postModel = require('../Models/post.model');

exports.createPost = async (title, content, userId) => {
  try {
    let postAdd = new postModel({ title, content, createdBy: userId });
    await postAdd.save();
    return { type: 'Success', message: 'Post added successfully' };
  } catch (error) {
    console.log('error', error);
    throw new Error('Error! Post not added');
  }
};

exports.getAllPosts = async (userId) => {
  try {
    const allPosts = await postModel.find({ createdBy: userId });
    return allPosts;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to fetch posts');
  }
};

exports.getPostDetails = async (req, res) => {
  try {
    let getPostDetails = await postModel.findOne({ _id: req.params.postId });
    return res.json({
      type: 'Success',
      data: getPostDetails,
    });
  } catch (error) {
    console.log(' error ', error);
    return res.json({
      type: 'error',
      massage: 'Error! Post not found',
    });
  }
};

exports.updatePost = async (postId, dataBody, userId) => {
  try {
    await postModel.findByIdAndUpdate(postId, {
      title: dataBody.title,
      content: dataBody.content,
      updatedBy: userId,
      updatedDate: new Date(),
    });
    return {
      type: 'Success',
      message: 'Post updated successfully',
    };
  } catch (error) {
    console.log('error', error);
    throw new Error('Error! Post not updated');
  }
};
