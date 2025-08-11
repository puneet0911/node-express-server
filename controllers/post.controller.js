const postService = require('../services/post.service');


exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts(req.session.passport.user._id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getPostDetails = async (req, res) => {
    try {
        const post = await postService.getPostDetails(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updatePost = async (req, res) => {  
    try {
        const updatedPost = await postService.updatePost(req.params.postId, req.body);
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}